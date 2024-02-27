import { OptHelpExit } from "./OptHelpExit"
import { OptError } from "./OptError"
import { OptExit } from "./OptExit"
import { LongOption } from "./LongOption"
import { ShortOptions } from "./ShortOptions"
import { AbortProcessingSymbol } from "./AbortProcessingSymbol"
import { LiteralArgument } from "./LiteralArgument"
import { OptWrapperMany } from "./OptWrapperMany"
import { OptWrapper } from "./OptWrapper"

/**
 *
 */
export class OptHandler<T extends Record<string, OptWrapper<any>>> {
    /**
     *
     */
    private extendedOptions
    /**
     *
     */
    private options

    /**
     *
     * @param key
     * @param opt
     * @param getExplicitValue
     * @param value
     * @returns
     */
    private getArgValue(key: string, opt: OptWrapper<any>, getExplicitValue: () => string | undefined, value?: string) {
        /**
         *
         * @returns
         */
        const getExplicitValueOrThrow = () => {
            const value = getExplicitValue()
            if(value === undefined) {
                throw new OptError(`Error: Option ${key} required an argument`, 7)
            }
            return value
        }
        switch(opt.type) {
            case "boolean":
                if(value !== undefined) {
                    throw new OptError(`Error: Argument supplied for boolean option ${key}`, 6)
                }
                return true
            case "number": {
                const v = value ?? getExplicitValueOrThrow()
                if(Number.isNaN(v)) {
                    throw new OptError(`Error: Argument must be numeric for ${key}`, 6)
                }
                return +v
            }
            case "string":
                return value ?? getExplicitValueOrThrow()
        }
    }

    /**
     *
     * @param arg
     * @returns
     */
    private parseArg(arg: string) {
        let md: RegExpMatchArray | null
        if(md = arg.match(/^--([\w-]+)(=(.*))?/)) {
            // Long opt.
            const [name, value] = [md[1], md[2] ?? undefined]
            return new LongOption(name, value, arg)
        } else if(md = arg.match(/^-(\w.*)/)) {
            // Short opts.
            const shortOpts = md[1]
            return new ShortOptions(shortOpts, arg)
        } else if(arg == "--") {
            // Stop processing
            return new AbortProcessingSymbol(arg)
        } else {
            return new LiteralArgument(arg)
        }
    }

    /**
     *
     * @param k eg. "getAll"
     * @returns eg. "--get-all"
     */
    private toCliArg(k: string): string {
        return "--" + k.replace(/(?<=.)([\p{Lu}]+[\d_\p{Ll}]*)/gu, (a, $1) => `-${$1.toLowerCase()}`)
    }

    /**
     * @readonly
     */
    name

    /**
     *
     */
    get helpMessage() {
        const {positional, positionalOptional, positionalVar} = this.extendedOptions

        const argComponents = Object.entries(this.options).sort(([a, ac], [b, bc]) => (+!!ac.required - +!!bc.required) || a.localeCompare(b)).map(([s, config]) => {
            let o: string
            const cliArg = this.toCliArg(s)
            o = [
                ...config.alias.map(a => `-${a}`),
                cliArg
            ].join("|")
            if (config.type != "boolean") {
                if (config.def) {
                    o += ` <${config.type} = ${config.def}>`
                } else {
                    o += ` <${config.type}>`
                }
            }
            if (config.required) {
                return config.many ? `${o} [${o}]...` : o
            } else {
                return config.many ? `[${o}]...` : `[${o}]`
            }
        })
        const components = [
            this.name,
            ...argComponents,
            ...(positional ?? []).map(p => `<${p}>`),
            ...(positionalOptional ?? []).map(p => `[<${p}>]`),
        ]
        if(positionalVar) {
            components.push(`[<${positionalVar}>]...`)
        }
        return `Usage: ${components.join(" ")}`
    }

    /**
     *
     * @param options
     * @param extendedOptions
     * @param name
     */
    constructor(options: T, extendedOptions: {positional?: string[], positionalOptional?: string[], positionalVar?: string, help?: string}, name: string) {
        this.extendedOptions = extendedOptions
        this.name = name

        this.options = options
    }
    /**
     *
     * @param argv
     * @returns
     */
    fromArgv(argv: string[]): {[k in keyof T]: ReturnType<T[k]["get"]>} {
        return this.fromProgramArgs(argv.slice(2))
    }

    /**
     *
     * @returns
     */
    fromArgvOrExit() {
        try {
            return this.fromArgv(process.argv)
        } catch(e) {
            if(e instanceof OptExit) {
                e.outputAndExit()
            }
            throw e
        }
    }

    /**
     *
     * @param args
     * @returns
     */
    fromProgramArgs(args: string[]): {[k in keyof T]: ReturnType<T[k]["get"]>} {
        const canonicalNameOf: Record<string, string> = {}
        const knownShortOpts: Record<string, OptWrapper<any>> = {}
        for(const [k, v] of Object.entries(this.options)) {
            for(const a of v.alias) {
                knownShortOpts[a] = v
                canonicalNameOf[a] = k
            }
        }

        const opts = Object.fromEntries(
            Object.entries(this.options).map(([k, o]) => [k, o.initialValue])
        )
        const positional: string[] = []
        const mArgs = args.slice()

        const cNames = Object.fromEntries(
            Object.keys(this.options).map(k => [this.toCliArg(k), k])
        )

        /**
         *
         * @param name
         * @param value
         */
        const addArg = (name: string, value: any) => {
            const existing = opts[name]
            if(Array.isArray(existing)) {
                existing.push(value)
            } else {
                opts[name] = value
            }
        }

        let arg: string | undefined
        while((arg = mArgs.shift()) !== undefined) {
            const parsed = this.parseArg(arg)
            if(parsed instanceof LongOption) {
                // Long opt.
                const cName = cNames[parsed.key]
                const opt = this.options[cName]
                if(!opt) {
                    throw new OptError(`Error: Unrecognised long option ${parsed.key}`, 5)
                }
                addArg(cName, this.getArgValue(parsed.key, opt, () => mArgs.shift(), parsed.value))
            } else if(parsed instanceof ShortOptions) {
                // Short opts.
                let optionCode: string | undefined
                while(optionCode = parsed.next()) {
                    const opt = knownShortOpts[optionCode]
                    if(!opt) {
                        throw new OptError(`Error: Unrecognised short option ${parsed.prevOption} in ${parsed.literalArgument}`, 3)
                    }
                    const cName = canonicalNameOf[optionCode]
                    addArg(cName, this.getArgValue(parsed.prevOption!, opt, () => parsed.rest.length ? parsed.rest : mArgs.shift()))
                }
            } else if(parsed instanceof AbortProcessingSymbol) {
                // Stop processing
                positional.push(...mArgs)
                break
            } else {
                positional.push(parsed.literalArgument)
            }
        }

        const helpOption = this.extendedOptions.help
        if(helpOption && opts[helpOption]) {
            throw new OptHelpExit(this.helpMessage)
        }
        const positionalMin = (this.extendedOptions.positional?.length ?? 0)
        const positionalMax = this.extendedOptions.positionalVar ? Infinity :
            (positionalMin + (this.extendedOptions.positionalOptional?.length ?? 0))

        if(positional.length < positionalMin) {
            throw new OptError(`Too few arguments (${positional.length} < ${positionalMin}).\n${this.helpMessage}`, 1)
        }
        if(positional.length > positionalMax) {
            throw new OptError(`Too many arguments (${positional.length} > ${positionalMax}).\n${this.helpMessage}`, 2)
        }

        return Object.fromEntries([
            ...Object.entries(this.options).map(([k, o]) => [k, o.get(k, opts)]),
            ["_", positional],
        ])
    }

    /**
     *
     * @param alias
     * @param type
     * @returns Value extractor (optional, many)
     */
    static om(alias: string[], type: "number"): OptWrapper<number[]>
    static om(alias: string[], type: "string"): OptWrapper<string[]>
    static om(alias: string[], type: "number" | "string"): OptWrapper<number[] | string[]> {
        return new OptWrapperMany<any>(alias, type, false)
    }

    /**
     *
     * @param alias
     * @param type
     * @returns Value extractor (optional, single)
     */
    static os(alias: string[], type: "boolean"): OptWrapper<boolean>
    static os(alias: string[], type: "number"): OptWrapper<number | undefined>
    static os(alias: string[], type: "number", def: number): OptWrapper<number>
    static os(alias: string[], type: "string"): OptWrapper<string | undefined>
    static os(alias: string[], type: "string", def: string): OptWrapper<string>
    static os(alias: string[], type: "boolean" | "number" | "string", def?: number | string): OptWrapper<boolean | number | string | undefined> {
        return new OptWrapper<any>(alias, type, false, def)
    }

    /**
     *
     * @param alias
     * @param type
     * @returns Value extractor (required, many)
     */
    static rm(alias: string[], type: "number"): OptWrapper<number[]>
    static rm(alias: string[], type: "string"): OptWrapper<string[]>
    static rm(alias: string[], type: "number" | "string"): OptWrapper<number[] | string[]> {
        return new OptWrapperMany<any>(alias, type, true)
    }

    /**
     *
     * @param alias
     * @param type
     * @returns Value extractor (required, single)
     */
    static rs(alias: string[], type: "number"): OptWrapper<number>
    static rs(alias: string[], type: "string"): OptWrapper<string>
    static rs(alias: string[], type: "number" | "string"): OptWrapper<number | string> {
        return new OptWrapper<any>(alias, type, true)
    }
}