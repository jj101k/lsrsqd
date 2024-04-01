import { ParsingInstructionHandler } from "./ParsingInstructionHandler.mjs"

/**
 *
 */
export class IndirectLoadInstructionHandler extends ParsingInstructionHandler {
    /**
     *
     */
    #indirectRegister
    /**
     *
     */
    #register

    /**
     *
     * @protected
     * @param {import("../DataWalker.mjs").DataWalker} dw
     * @param {import("../DecompileContext.mjs").DecompileContext} context
     * @returns
     */
    get(dw, context) {
        const di = super.get(dw, context)
        const v = context.s8.getIndirectMemoryValue(this.#indirectRegister)
        context.s8.storeRegisterValue(this.#register, v)
        return di
    }

    /**
     *
     * @param {import("../Z80Registers.d.mts").Z80Registers8b} register
     * @param {import("../Z80Registers.d.mts").Z80Registers16b} indirectRegister
     * @param {import("../UtilityTypes.d.mts").actionHandler<import("../DecomposedInstruction/DecomposedInstructionParsing.mjs").DecomposedInstructionParsing>} [withAction]
     */
    constructor(register, indirectRegister, withAction) {
        super(`LD ${register}, (${indirectRegister})`, withAction)
        this.#register = register
        this.#indirectRegister = indirectRegister
    }
}