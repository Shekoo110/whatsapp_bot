const fs = require("fs")
const path = require("path")

class Optimizer {

    constructor(file) {

        this.file = file
        this.code = ""
        this.lines = []

    }

    load() {

        this.code = fs.readFileSync(
            this.file,
            "utf8"
        )

        this.lines =
            this.code.split("\n")

    }

    optimize() {

        this.removeDuplicateRequire()

        this.removeExtraSpaces()

        this.mergeEmptyLines()

        return this.lines.join("\n")

    }

    removeDuplicateRequire() {

        const seen = new Set()

        this.lines =
            this.lines.filter(line => {

                if (
                    !line.includes("require(")
                ) return true

                if (seen.has(line))
                    return false

                seen.add(line)

                return true

            })

    }

    removeExtraSpaces() {

        this.lines =
            this.lines.map(line =>
                line.replace(/\s+$/g, "")
            )

    }

    mergeEmptyLines() {

        const result = []

        let empty = false

        for (const line of this.lines) {

            if (
                line.trim() === ""
            ) {

                if (!empty)
                    result.push("")

                empty = true

            }

            else {

                empty = false
                result.push(line)

            }

        }

        this.lines = result

    }

}

module.exports = async function () {

    const input =
        path.join(
            process.cwd(),
            "index.js"
        )

    const output =
        path.join(
            process.cwd(),
            "index.optimized.js"
        )

    const opt =
        new Optimizer(input)

    opt.load()

    const newCode =
        opt.optimize()

    fs.writeFileSync(
        output,
        newCode
    )

    return output

}
