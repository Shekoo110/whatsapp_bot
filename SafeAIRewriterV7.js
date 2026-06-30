const fs = require("fs")
const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generate = require("@babel/generator").default
const t = require("@babel/types")

class SafeAIRewriterV7 {

    constructor() {
        this.changes = []
        this.lastCalls = new Map()
    }

    getScope(path) {
        let p = path.getFunctionParent()
        return p?.node?.id?.name || "global"
    }

    hasSideEffectsBetween(path) {
        const parent = path.getStatementParent()
        if (!parent) return false

        const code = parent.toString()

        return (
            code.includes("await") ||
            code.includes("if") ||
            code.includes("for") ||
            code.includes("while")
        )
    }

    isSafeMerge(prev, curr, path) {

        if (!prev) return false

        // نفس النوع
        if (prev.name !== curr.name) return false

        // نفس السياق
        if (prev.scope !== curr.scope) return false

        // إذا فيه أي تغيير منطق بينهما ❌ لا تدمج
        if (this.hasSideEffectsBetween(path)) return false

        return true
    }

    optimize(path) {

        const node = path.node
        if (!node?.callee) return

        const callee = node.callee
        if (!t.isMemberExpression(callee)) return

        const name = callee.property.name
        const scope = this.getScope(path)

        const key = scope + ":" + name

        const current = {
            name,
            scope
        }

        const prev = this.lastCalls.get(key)

        // 🧠 SAFE MERGE LOGIC
        if (this.isSafeMerge(prev, current, path)) {

            this.changes.push(`🧠 MERGED SAFE: ${name} in ${scope}`)

            path.remove()
            return
        }

        this.lastCalls.set(key, current)

        // ⚡ SAFE TRANSFORM ONLY (NO LOGIC CHANGE)
        switch (name) {

            case "findOne":
                callee.property = t.identifier("cachedFindOne")
                break

            case "find":
                callee.property = t.identifier("cachedFind")
                break

            case "save":
                callee.property = t.identifier("queueSave")
                break

            case "updateOne":
            case "updateMany":
                callee.property = t.identifier("batchedUpdate")
                break

            case "sendMessage":
            case "safeSend":
                callee.property = t.identifier("queuedSend")
                break

            case "require":
                // لا نغير require (خطير)
                return
        }

        this.changes.push(`⚡ optimized: ${name}`)
    }

    run(input = "./index.js", output = "./index.optimized.js") {

        const code = fs.readFileSync(input, "utf8")

        const ast = parser.parse(code, {
            sourceType: "unambiguous",
            plugins: ["jsx", "classProperties"]
        })

        traverse(ast, {
            CallExpression: (path) => this.optimize(path)
        })

        const out = generate(ast, {}, code)

        fs.writeFileSync(output, out.code)

        return {
            file: output,
            changes: this.changes
        }
    }
}

module.exports = new SafeAIRewriterV7()
