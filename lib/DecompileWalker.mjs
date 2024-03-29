
import { CodeDecompiler } from "./CodeDecompiler.mjs"
import { DecomposedInstruction } from "./InstructionHandler/DecomposedInstruction.mjs"
import { Initial } from "./InstructionHandler/Initial.mjs"
import { Z80CompoundRegisters, Z80Registers16B } from "./Z80Registers.mjs"

/**
 * @typedef {"fn" | "j"} jumpType
 */

/**
 * @type {Record<string, number>}
 */
const debugOptions = {
    jump: 1 << 0,
}

/**
 *
 */
export class DecompileWalker extends CodeDecompiler {
    /**
     * @type {Record<string, number | null>}
     */
    #activeRegisterValues = {}

    /**
     *
     */
    #debugOptions = 0

    /**
     * Where the last linear decompile run started
     */
    #entryPoint = this.loadPoint

    /**
     *
     */
    #finished = false

    /**
     *
     */
    #handler = new Initial()

    /**
     * @type {Record<number, {rel: number[], direct: number[], type: jumpType}>}
     * Maps memory addresses to the relative/direct caller lists (also memory addresses)
     */
    #jumps = {}

    /**
     * @type {number | null}
     */
    #jumpTo = null

    /**
     *
     */
    #lastEndPoint = 0

    /**
     * @type {Set<number>} A set of literal memory locations.
     */
    #memoryLocations = new Set()

    /**
     * @type {Set<number>} A set of literal memory locations, possibly including
     * unrelated content which was put in HL.
     */
    #probableAddresses = new Set()

    /**
     * @type {Map<number, [DecomposedInstruction | undefined, number]>}
     */
    #seen = new Map()

    /**
     * The file offset at which the currently decoded instruction started
     */
    #startPoint = 0

    /**
     * @type {Set<number>} This can include targets outside the range. These are
     * file offsets.
     */
    #targets = new Set()

    /**
     *
     * @param {number} n
     */
    #addTargetFile(n) {
        if(!this.#targets.has(n)) {
            if(n < 0 || n >= this.dw.length) {
                console.warn(`Jump target ${this.addr(n)} (${this.addr(n + this.loadPoint)}) is out of range`)
            }
            this.#targets.add(n)
        }
    }

    /**
     * Clears all state which might be present before a jump
     */
    #clearState() {
        this.#activeRegisterValues = {}
    }

    /**
     *
     * @param {debugOptions[""]} type
     * @param {string} message
     */
    #debug(type, message) {
        if(this.#debugOptions & type) {
            console.debug(message)
        }
    }

    /**
     *
     * @param {import("./Z80Registers.mjs").Z80Registers16B} register
     * @returns The lowest-level registers
     */
    #expandRegisterReference(register) {
        if(Z80CompoundRegisters.includes(register)) {
            return register.split("") // Just the 8080 style; in H-L order
        } else {
            return [register]
        }
    }

    /**
     *
     * @param {number} n The memory offset
     * @returns The file offset
     */
    #memoryAddress(n) {
        return n - this.loadPoint
    }

    /**
     *
     * @param {number} n
     * @returns The file offset
     */
    #relativeAddress(n) {
        return this.#startPoint + n
    }

    /**
     * Set to true during instruction parsing if it jumps to an unknown location
     */
    unknownJump = false

    /**
     * Where the last linear decompile run started. Set this to start from that position.
     */
    get entryPoint() {
        return this.#entryPoint
    }
    set entryPoint(v) {
        if(this.#probableAddresses.has(v)) {
            this.#probableAddresses.delete(v)
        }
        this.dw.offset = v - this.loadPoint
        this.#entryPoint = v
        this.#activeRegisterValues = {}
    }

    /**
     *
     */
    get finished() {
        return this.#finished
    }

    set finished(v) {
        this.#finished = v
    }

    /**
     *
     */
    get lastEndPoint() {
        return this.#lastEndPoint
    }

    /**
     *
     */
    get outOfRangeContent() {
        const memoryLocations = [...this.#memoryLocations, ...this.#probableAddresses]
        const functions = Object.entries(this.#jumps).filter(([, j]) => j.type == "fn").map(([n]) => +n)
        const jumps = Object.entries(this.#jumps).filter(([, j]) => j.type == "j").map(([n]) => +n)

        /**
         *
         * @param {number} n
         * @returns
         */
        const outOfRange = (n) => n < this.loadPoint || n >= this.dw.length + this.loadPoint
        return {
            memoryLocations: memoryLocations.filter(outOfRange),
            jumps: jumps.filter(outOfRange),
            functions: functions.filter(outOfRange),
        }
    }

    /**
     *
     */
    get startPoint() {
        return this.#startPoint
    }

    /**
     *
     * @param {number} n
     */
    addJumpTo(n) {
        this.#jumpTo = this.addTarget(n)
    }

    /**
     *
     */
    addJumpToHL() {
        const activeHLValue = this.getRegisterValue(Z80Registers16B.HL)
        if(activeHLValue !== null) {
            this.#jumpTo = this.addTarget(activeHLValue)
        } else {
            this.unknownJump = true
        }
    }

    /**
     *
     * @param {number} n
     */
    addJumpToRel(n) {
        this.#jumpTo = this.addTargetRel(n)
    }

    /**
     * This notes that n is definitely being used as readable or writeable
     * memory. It might still possibly be used as code.
     *
     * @param {number} n A location in memory
     */
    addMemoryLocation(n) {
        this.#probableAddresses.delete(n)
        this.#memoryLocations.add(n)
    }

    /**
     *
     * @param {number} n
     * @param {jumpType} [type]
     */
    addTarget(n, type = "j") {
        this.#debug(debugOptions.jump, `JT ${this.addr(n)}`)
        if(!this.#jumps[n]) {
            this.#jumps[n] = {rel: [], direct: [], type}
        }
        this.#jumps[n].direct.push(this.#startPoint + this.loadPoint)

        const fn = this.#memoryAddress(n)
        this.#addTargetFile(fn)
        this.#debug(debugOptions.jump, `-> ${this.addr(fn + this.loadPoint)}`)
        return fn
    }

    /**
     *
     * @param {number} n
     */
    addTargetRel(n) {
        this.#debug(debugOptions.jump, `JTR ${this.addr(this.#startPoint + this.loadPoint)}+${n}`)
        const address = this.#relativeAddress(n) + this.loadPoint
        if(!this.#jumps[address]) {
            this.#jumps[address] = {rel: [], direct: [], type: "j"}
        }
        this.#jumps[address].rel.push(this.#startPoint + this.loadPoint)

        const fn = this.#relativeAddress(n)
        this.#addTargetFile(fn)
        this.#debug(debugOptions.jump, `-> ${this.addr(fn + this.loadPoint)}`)
        return fn
    }

    /**
     *
     * @param {string} register
     */
    clearRegisterValue(register) {
        for(const sr of this.#expandRegisterReference(register)) {
            this.#activeRegisterValues[sr] = null
        }
    }

    /**
     *
     * @returns {DecomposedInstruction | null | undefined}
     */
    decode() {
        this.#startPoint = this.dw.offset
        this.#jumpTo = null
        this.unknownJump = false
        let n

        try {
            n = this.#handler.resolve(this.dw, this)
        } catch(e) {
            if(!(e instanceof RangeError)) {
                console.log(e)
            }
            this.#seen.set(this.#startPoint, [undefined, this.dw.offset - this.#startPoint])
            for(const t of this.#targets) {
                if(!this.#seen.has(t) && t >= 0 && t < this.dw.length) {
                    this.entryPoint = t + this.loadPoint
                    this.#debug(debugOptions.jump, `Auto-jump ${this.addr(t + this.loadPoint)}`)
                    return this.decode()
                }
            }
            this.#finished = true
        }
        if(n) {
            this.#lastEndPoint = this.dw.offset
            this.#seen.set(this.#startPoint, [n, this.#lastEndPoint - this.#startPoint])
            if(this.#jumpTo) {
                this.#clearState()
                this.entryPoint = this.#jumpTo + this.loadPoint
            }
            if(this.unknownJump || this.#seen.has(this.dw.offset)) {
                for(const t of this.#targets) {
                    if(!this.#seen.has(t) && t >= 0 && t < this.dw.length) {
                        this.entryPoint = t + this.loadPoint
                        this.#debug(debugOptions.jump, `Auto-jump ${this.addr(t + this.loadPoint)}`)
                        return n
                    }
                }
                this.#finished = true
            }
        }
        return n
    }

    /**
     *
     */
    *dump() {
        /**
         * @type {{start: number, length: number}[]}
         */
        const memoryRegions = []
        const memoryLocations = [...this.#memoryLocations, ...this.#probableAddresses].sort((a, b) => a - b)
        if(memoryLocations.length) {
            let currentMemoryRegion = {start: memoryLocations[0], length: 0}
            memoryRegions.push(currentMemoryRegion)
            for(const l of memoryLocations) {
                if(l == currentMemoryRegion.start + currentMemoryRegion.length) {
                    currentMemoryRegion.length++
                } else {
                    currentMemoryRegion = {start: l, length: 1}
                    memoryRegions.push(currentMemoryRegion)
                }
            }
        }

        const functions = Object.entries(this.#jumps).filter(([, j]) => j.type == "fn").sort(([na], [nb]) => +na - +nb)
        const jumps = Object.entries(this.#jumps).filter(([, j]) => j.type == "j").sort(([na], [nb]) => +na - +nb)
        const relJumps = jumps.filter(([, j]) => j.direct.length == 0)
        const directJumps = jumps.filter(([, j]) => j.direct.length > 0)

        const directJumpsInRange = directJumps.filter(([n]) => +n >= this.loadPoint && +n < this.dw.length + this.loadPoint)
        const functionsInRange = functions.filter(([n]) => +n >= this.loadPoint && +n < this.dw.length + this.loadPoint)
        const memoryLocationsInRange = memoryLocations.filter((r) => r >= this.loadPoint && r < this.dw.length + this.loadPoint)
        const relJumpsInRange = relJumps.filter(([n]) => +n >= this.loadPoint && +n < this.dw.length + this.loadPoint)

        const dl = (directJumpsInRange.length - 1).toString().length
        const fl = (functionsInRange.length - 1).toString().length
        const ml = (memoryLocationsInRange.length - 1).toString().length
        const rl = (relJumpsInRange.length - 1).toString().length
        const labels = Object.fromEntries([
            ...functionsInRange.map(([n], i) => [n, `fn${i.toString().padStart(fl, "0")}`]),
            ...directJumpsInRange.map(([n], i) => [n, `jp${i.toString().padStart(dl, "0")}`]),
            ...memoryLocationsInRange.map((r, i) => [r, `mp${i.toString().padStart(ml, "0")}`]),
            ...relJumpsInRange.map(([n], i) => [n, `re${i.toString().padStart(rl, "0")}`]),
        ])

        /**
         * @type {Set<number>}
         */
        const seenMemoryLocations = new Set()

        /**
         *
         */
        const abbreviateAtBytes = 4

        /**
         *
         * @param {number} at
         * @param {number} l
         * @returns
         */
        const abbrBytes = (at, l) => {
            if(l > abbreviateAtBytes) {
                return this.u8r(...this.dw.inspectAt(at, abbreviateAtBytes)) + "..."
            } else {
                return this.u8r(...this.dw.inspectAt(at, l))
            }
        }

        /**
         *
         * @param {string} content
         * @param {number} length
         * @param {number} location
         * @param {string} label
         * @returns
         */
        const out = (content, length, location, label = "") => {
            return [
                label.padEnd(7, " "),
                content.padEnd(16, " "),
                ";",
                abbrBytes(location, length).padEnd(14, " "),
                `@${this.u16r(location + this.loadPoint)}`
            ].join(" ")
        }

        /**
         *
         * @param {string} content
         * @param {number} length
         * @param {number} location
         * @param {string} label
         * @returns
         */
        const outBlock = function*(content, length, location, label = "") {
            for(let i = 0; i < length; i += abbreviateAtBytes) {
                if(i == 0) {
                    yield out(content, Math.min(length, abbreviateAtBytes), location, label)
                } else {
                    yield out("", Math.min(length - i, abbreviateAtBytes), location + i, "")
                }
            }
        }

        /**
         *
         * @param {string} content
         * @returns
         */
        const outMeta = (content) => {
            return [
                "".padEnd(7, " "),
                content.padEnd(40, " ")
            ].join(" ")
        }

        /**
         * @type {Record<string, number>}
         */
        const stats = {}

        const startPoints = [...this.#seen.entries()].filter(([, [di]]) => !!di).map(([k]) => k).sort((a, b) => a - b)
        yield outMeta(`ORG ${this.addr(startPoints[0] + this.loadPoint)}`)
        let offset = 0
        for(const startPoint of startPoints) {
            if(startPoint < 0 || startPoint >= this.dw.length) {
                continue
            }
            if(startPoint > offset) {
                const memoryLocationsInGap = memoryLocationsInRange.filter(r => r - this.loadPoint >= offset && r - this.loadPoint < startPoint)
                for(let i = 0; i < memoryLocationsInGap.length; i++) {
                    const memoryLocation = memoryLocationsInGap[i]
                    if(memoryLocation - this.loadPoint > offset) {
                        const l = memoryLocation - this.loadPoint - offset
                        yield *outBlock(`DS ${l}`, l, offset)
                        offset = memoryLocation - this.loadPoint
                    }
                    seenMemoryLocations.add(memoryLocation)
                    /**
                     * @type {(typeof memoryLocationsInGap[0]) | undefined}
                     */
                    const nextLocation = memoryLocationsInGap[i + 1]
                    const nextPoint = nextLocation !== undefined ? nextLocation - this.loadPoint : startPoint
                    // Auto-expand
                    if(offset + 1 < nextPoint) {
                        const l = nextPoint - offset
                        yield *outBlock(`DS ${l}`, l, offset, labels[offset + this.loadPoint] ?? "")
                        offset = nextPoint
                    } else {
                        yield out("DS 1", 1, offset, labels[offset + this.loadPoint] ?? "")
                        offset++
                    }
                }
                if(startPoint > offset) {
                    const l = startPoint - offset
                    yield *outBlock(`DS ${l}`, l, offset)
                }
                offset = startPoint
            }
            const [n, l] = this.#seen.get(startPoint)
            const label = labels[startPoint + this.loadPoint]
            const caption = n.toString(labels, startPoint + this.loadPoint)
            yield out(caption, l, startPoint, label ?? "")

            if(!stats[n.uid]) {
                stats[n.uid] = 0
            }
            stats[n.uid]++

            offset = startPoint + l
        }

        const missingMemoryLocations = memoryLocationsInRange.filter(r => !seenMemoryLocations.has(r))
        if(missingMemoryLocations.length) {
            console.warn(`Missing memory locations (>= ${this.addr(this.loadPoint)} and < ${this.addr(this.dw.length + this.loadPoint)})`, missingMemoryLocations.map(r => `${this.addr(r)}`))
        }

        console.warn("Dumping instruction frequency")
        const statResults = Object.entries(stats).sort(([, a], [, b]) => b - a)
        let seen = 0
        for(const [name, frequency] of statResults) {
            seen++
            console.warn(`${seen} ${frequency}x ${name} `)
        }
    }

    /**
     *
     * @param {string} register
     * @param {number} offset
     * @returns
     */
    getIndirectMemoryValue(register, offset = 0) {
        return this.getMemoryValue(this.getRegisterValue(register), offset)
    }

    /**
     * Not yet implemented
     *
     * @param {number | null} address
     * @param {number} offset
     * @returns {number | null}
     */
    getMemoryValue(address, offset = 0) {
        return null
    }

    /**
     *
     * @param {{name: string, update?: (a: number, b: number) => number}} op
     * @param {number | null} a
     * @param {number | null} b
     * @returns
     */
    getOpResult(op, a, b) {
        if(a !== null && b !== null) {
            return op.update?.(a, b) ?? null
        } else {
            return null
        }
    }

    /**
     *
     * @param {string} register
     * @returns {number | null}
     */
    getRegisterValue(register) {
        const p = this.#expandRegisterReference(register).map(r => this.#activeRegisterValues[r] ?? null)
        let vOut = 0
        for(const [i, v] of p.entries()) {
            if(v === null) {
                return null
            }
            vOut += v * Math.pow(256, p.length - i - 1)
        }
        return vOut
    }

    /**
     *
     * @param {string} expression
     * @returns {number | null}
     */
    getValue(expression) {
        let md
        if((md = expression.match(/^\([$](.*)\)$/))) {
            // This exists for completeness only - you would normally just use getMemoryValue().
            return this.getMemoryValue(Number.parseInt(md[1], 16))
        } else if((md = expression.match(/^\((.*)\)$/))) {
            const registerValue = this.getRegisterValue(md[1])
            if(!registerValue) {
                return null
            }
            return this.getMemoryValue(registerValue)
        } else {
            return this.getRegisterValue(expression)
        }
    }

    /**
     *
     * @param {string} register
     * @param {number | null} n
     */
    storeRegisterValue(register, n) {
        const srs = this.#expandRegisterReference(register)
        for(const [i, sr] of srs.entries()) {
            this.#activeRegisterValues[sr] = (n >> ((srs.length - i - 1) * 8)) & 0xff
        }
        switch(register) {
            case Z80Registers16B.HL: {
                if(!this.#memoryLocations.has(n) && !this.#targets.has(n - this.loadPoint)) {
                    this.#probableAddresses.add(n)
                }
                break
            }
            case Z80Registers16B.IX:
                // Fall through
            case Z80Registers16B.IY:
            {
                this.#memoryLocations.add(n)
                break
            }
            case Z80Registers16B.SP: {
                this.#memoryLocations.add(n)
                break
            }
        }
    }

    /**
     *
     * @param {import("./Z80Registers.mjs").Z80Registers8B} register
     * @param {{name: string, update?: (a: number, b: number) => number}} op
     * @param {number | null} value
     */
    updateRegisterValue(register, op, value) {
        this.storeRegisterValue(register, this.getOpResult(op, this.getRegisterValue(register), value))
    }
}