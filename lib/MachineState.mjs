
import { Z80Registers8b } from "./Z80Registers.mjs"
import { Z80Registers16b } from "./Z80Registers.mjs"
import { Z80CompoundRegisters } from "./Z80Registers.mjs"

/**
 *
 */
export class MachineState {
    /**
     * @type {Record<number, number>}
     */
    #activeMemoryValues = {}

    /**
     * @type {Partial<Record<import("./Z80Registers.d.mts").Z80AtomicRegister, number | null>>}
     */
    #activeRegisterValues = {}

    /**
     * @type {Record<string, Array<(content: any) => any>>}
     */
    #eventHandlers = {}

    /**
     *
     * @param {string} event
     * @param {any} content
     */
    #emit(event, content) {
        const handlers = this.#eventHandlers[event] ?? []
        for(const handler of handlers) {
            handler(content)
        }
    }

    /**
     * Expands a wide register into its underlying register references.
     *
     * @param {import("./Z80Registers.d.mts").Z80Registers16b} register
     * @returns {import("./Z80Registers.d.mts").Z80AtomicRegister[]} The lowest-level registers
     */
    #expandWideRegister(register) {
        return Z80CompoundRegisters[register] ?? [register]
    }

    /**
     *
     * @param {import("./Z80Registers.d.mts").Z80AtomicRegister} register
     */
    #clearAtomicRegisterValueExpanded(register) {
        this.#activeRegisterValues[register] = null
        this.#emit("storedRegisterValue", {register, value: null})
    }

    /**
     *
     * @param {import("./Z80Registers.mjs").Z80AtomicRegister} register
     * @param {number | null} n
     */
    #storeAtomicRegisterValueExpanded(register, n) {
        this.#activeRegisterValues[register] = n
        this.#emit("storedRegisterValue", {register, value: n})
    }

    /**
     *
     */
    changed = false

    /**
     *
     * @param {MachineState} [copyFrom]
     */
    constructor(copyFrom) {
        if(copyFrom) {
            this.#activeMemoryValues = {...copyFrom.#activeMemoryValues}
            this.#activeRegisterValues = {...copyFrom.#activeRegisterValues}
            this.#eventHandlers = copyFrom.#eventHandlers
        }
    }

    /**
     *
     * @param {string} event
     * @param {(content: any) => any} handler
     */
    addEventListener(event, handler) {
        if(this.#eventHandlers[event]) {
            this.#eventHandlers[event].push(handler)
        }
    }

    /**
     *
     * @param {string} register
     * @throws
     * @returns
     */
    assertAtomicRegisterValue(register) {
        if(
            Z80CompoundRegisters[register] ||
            ![Object.values(Z80Registers16b), ...Object.values(Z80Registers8b)].includes(register)
        ) {
            throw new Error(`${register} is not a valid wide register`)
        }
        return this.getAtomicRegisterValue(register)
    }

    /**
     *
     * @param {string} register
     * @throws
     * @returns
     */
    assertWideRegisterValue(register) {
        if(!Object.values(Z80Registers16b).includes(register)) {
            throw new Error(`${register} is not a valid wide register`)
        }
        return this.getWideRegisterValue(register)
    }

    /**
     *
     * @param {import("./Z80Registers.d.mts").Z80AtomicRegister} register
     */
    clearAtomicRegisterValue(register) {
        this.changed = true
        this.#clearAtomicRegisterValueExpanded(register)
        /**
         * @type {import("./Z80Registers.mjs").Z80Registers16b[]}
         */
        const compoundRegisters = Object.entries(Z80CompoundRegisters).filter(([, ars]) => ars.includes(register)).map(([cr]) => cr)
        for(const cr of compoundRegisters) {
            this.#emit("storedRegisterValue", {register: cr, value: null})
        }
    }

    /**
     *
     * @param {import("./Z80Registers.mjs").Z80Registers16b} register
     */
    clearWideRegisterValue(register) {
        this.changed = true
        for(const sr of this.#expandWideRegister(register)) {
            this.clearAtomicRegisterValue(sr)
        }
        this.#emit("storedRegisterValue", {register, value: null})
    }

    /**
     *
     * @returns
     */
    dump() {
        /**
         * @type {Record<number, number[]>}
         */
        const contiguousMemoryValues = {}
        /**
         * @type {{lastAddress: number, bytes: number[]} | null}
         */
        let activeRecord = null
        for(const [a, v] of Object.entries(this.#activeMemoryValues)) {
            if(!activeRecord || activeRecord.lastAddress + 1 < +a) {
                const bytes = [v]
                contiguousMemoryValues[+a] = bytes
                activeRecord = {lastAddress: +a, bytes: bytes}
            } else if(activeRecord.lastAddress + 1 == +a) {
                activeRecord.lastAddress = +a
                activeRecord.bytes.push(v)
            }
        }
        /**
         *
         * @param {string} s
         * @returns
         */
        const abbreviateMiddle = (s) => s.replace(/(..){2}(\1*)\1{2}/g, (a, $1, $2) => `${$1.repeat(2)}(...${$2.length}*...)${$1.repeat(2)}`)
        /**
         *
         * @param {number[]} vs
         * @returns
         */
        const byteRun = (vs) => abbreviateMiddle(vs.map(v => v.toString(16).padStart(2, "0")).join(""))
        const memoryValues = Object.entries(contiguousMemoryValues).map(([a, vs]) => `${(+a).toString(16)}=${byteRun(vs)}`)
        const displayRegisterValues = {...this.#activeRegisterValues}
        for(const [cr, ars] of Object.entries(Z80CompoundRegisters)) {
            if(ars.every(ar => this.#activeRegisterValues[ar] === undefined)) {
                continue
            }
            displayRegisterValues[cr] = this.getWideRegisterValue(cr)
            if(ars.every(ar => (this.#activeRegisterValues[ar] ?? null) !== null) || ars.every(ar => this.#activeRegisterValues[ar] === null)) {
                for(const ar of ars) {
                    delete displayRegisterValues[ar]
                }
            }
        }
        const registerValues = Object.entries(displayRegisterValues).map(([a, v]) => `${a}=${v?.toString(16) ?? "?"}`)
        if(memoryValues.length || registerValues.length) {
            return [...memoryValues, ...registerValues].join(", ")
        } else {
            return "initial state"
        }
    }

    /**
     *
     * @param {import("./Z80Registers.mjs").Z80AtomicRegister} register
     * @returns {number | null}
     */
    getAtomicRegisterValue(register) {
        return this.#activeRegisterValues[register] ?? null
    }

    /**
     *
     * @param {number | null} address
     * @param {number} length
     * @param {number} offset
     * @returns {number | null}
     */
    getMemoryBytes(address, length, offset = 0) {
        if(address === null) {
            return null
        }
        let v = 0
        for(let i = 0; i < length; i++) {
            const vi = this.#activeMemoryValues[address + offset + i]
            if(vi === null) {
                return null
            }
            v += vi >> i
        }
        return v
    }

    /**
     *
     * @param {import("./Z80Registers.mjs").Z80Registers16b} register
     * @returns {number | null}
     */
    getWideRegisterValue(register) {
        const srs = this.#expandWideRegister(register)
        let vOut = 0
        for(const [i, sr] of srs.entries()) {
            const v = this.getAtomicRegisterValue(sr)
            if(v === null) {
                return null
            }
            vOut += v * Math.pow(256, srs.length - i - 1)
        }
        return vOut
    }

    /**
     *
     * @param {string} event
     * @param {(content: any) => any} handler
     */
    removeEventListener(event, handler) {
        if(this.#eventHandlers[event]) {
            this.#eventHandlers[event] = this.#eventHandlers[event].filter(h => h !== handler)
        }
    }

    /**
     *
     * @param {import("./Z80Registers.mjs").Z80AtomicRegister} register
     * @param {number | null} n
     */
    storeAtomicRegisterValue(register, n) {
        this.changed = true
        this.#storeAtomicRegisterValueExpanded(register, n)
        /**
         * @type {import("./Z80Registers.mjs").Z80Registers16b[]}
         */
        const compoundRegisters = Object.entries(Z80CompoundRegisters).filter(([, ars]) => ars.includes(register)).map(([cr]) => cr)
        for(const cr of compoundRegisters) {
            this.#emit("storedRegisterValue", {register: cr, value: this.getWideRegisterValue(cr)})
        }
    }

    /**
     *
     * @param {number} location
     * @param {number | null} n
     * @param {number} length
     */
    storeMemoryBytes(location, n, length) {
        this.changed = true
        if(n === null) {
            for(let i = 0; i < length; i++) {
                delete this.#activeMemoryValues[location + i]
            }
        } else {
            for(let i = 0; i < length; i++) {
                this.#activeMemoryValues[location + i] = (n >> i) & 0xff
            }
        }
    }

    /**
     *
     * @param {import("./Z80Registers.mjs").Z80Registers16b} register
     * @param {number | null} n
     */
    storeWideRegisterValue(register, n) {
        this.changed = true
        const srs = this.#expandWideRegister(register)
        if(n === null) {
            for(const sr of srs) {
                this.#activeRegisterValues[sr] = null
            }
        } else {
            // This is actually underlying register width / wide register width,
            // but as a simple hack just checking for 1 result is fine.
            // @TODO properly detect register widths
            if(srs.length == 1) {
                this.#activeRegisterValues[srs[0]] = n
            } else {
                for(const [i, sr] of srs.entries()) {
                    this.#activeRegisterValues[sr] = (n >> ((srs.length - i - 1) * 8)) & 0xff
                }
            }
        }
        this.#emit("storedRegisterValue", {register, value: n})
    }
}