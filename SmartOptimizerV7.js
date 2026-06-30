const fs = require("fs")
const path = require("path")

const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generate = require("@babel/generator").default
const t = require("@babel/types")

class SmartOptimizerV7 {

    constructor(options = {}) {

        this.version = "7.0.0"

        this.stats = {}

        this.report = []

        this.options = {

            input: "./index.js",

            output: "./index.optimized.js",

            backup: true,

            safeMode: true,

            verbose: true,

            ...options

        }

        this.resetStats()

    }

    resetStats() {

        this.stats = {

            files: 0,

            lines: 0,

            awaits: 0,

            findOne: 0,

            find: 0,

            save: 0,

            updateOne: 0,

            updateMany: 0,

            sendMessage: 0,

            safeSend: 0,

            promiseAll: 0,

            require: 0,

            loops: 0,

            optimized: 0

        }

    }

    log(message) {

        this.report.push(message)

    }

    loadFile(file) {

        const code = fs.readFileSync(file, "utf8")

        this.stats.files++

        this.stats.lines = code.split("\n").length

        return code

    }

    parse(code) {

        return parser.parse(code, {

            sourceType: "unambiguous",

            plugins: [

                "jsx",

                "classProperties",

                "optionalChaining",

                "dynamicImport"

            ]

        })

    }

    saveFile(file, code) {

        fs.writeFileSync(file, code)

    }
                }

analyze(ast) {

    traverse(ast, {

        AwaitExpression: () => {

            this.stats.awaits++

        },

        ForStatement: (path) => {

            this.stats.loops++

            this.analyzeLoop(path)

        },

        WhileStatement: (path) => {

            this.stats.loops++

            this.analyzeLoop(path)

        },

        CallExpression: (path) => {

            this.analyzeCall(path)

        }

    })

}

analyzeCall(path) {

    const node = path.node

    if (!node.callee) return

    // require(...)
    if (
        t.isIdentifier(node.callee) &&
        node.callee.name === "require"
    ) {

        this.stats.require++
        return

    }

    if (!t.isMemberExpression(node.callee)) return

    const property = node.callee.property

    if (!t.isIdentifier(property)) return

    switch (property.name) {

        case "findOne":

            this.stats.findOne++

            this.log({
                type: "findOne",
                line: node.loc?.start?.line
            })

            break

        case "find":

            this.stats.find++

            this.log({
                type: "find",
                line: node.loc?.start?.line
            })

            break

        case "save":

            this.stats.save++

            this.log({
                type: "save",
                line: node.loc?.start?.line
            })

            break

        case "updateOne":

            this.stats.updateOne++

            this.log({
                type: "updateOne",
                line: node.loc?.start?.line
            })

            break

        case "updateMany":

            this.stats.updateMany++

            this.log({
                type: "updateMany",
                line: node.loc?.start?.line
            })

            break

        case "sendMessage":

            this.stats.sendMessage++

            this.log({
                type: "sendMessage",
                line: node.loc?.start?.line
            })

            break

        case "safeSend":

            this.stats.safeSend++

            this.log({
                type: "safeSend",
                line: node.loc?.start?.line
            })

            break

    }

}

analyzeLoop(path) {

    let awaitCount = 0

    path.traverse({

        AwaitExpression() {

            awaitCount++

        }

    })

    if (awaitCount > 0) {

        this.log({

            type: "await-loop",

            line: path.node.loc?.start?.line,

            awaits: awaitCount

        })

    }

}

analyzePromiseAll(ast) {

    traverse(ast, {

        CallExpression: (path) => {

            const node = path.node

            if (

                t.isMemberExpression(node.callee) &&

                t.isIdentifier(node.callee.object) &&

                node.callee.object.name === "Promise" &&

                t.isIdentifier(node.callee.property) &&

                node.callee.property.name === "all"

            ) {

                this.stats.promiseAll++

            }

        }

    })

    }
