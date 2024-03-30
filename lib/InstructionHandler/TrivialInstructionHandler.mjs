import { DecomposedInstructionParsing } from "./DecomposedInstructionParsing.mjs"
import { InstructionHandler } from "./InstructionHandler.mjs"

/**
 *
 */
export class TrivialInstructionHandler extends InstructionHandler {
    /**
     * @protected
     * @param {import("../DataWalker.mjs").DataWalker} dw
     * @param {import("../DecompileContext.mjs").DecompileContext} context
     * @returns {DecomposedInstructionParsing | undefined | null}
     */
    get(dw, context) {
        return new DecomposedInstructionParsing(this.name, dw, context.startPoint)
    }
    /**
     *
     */
    name
    /**
     *
     * @param {string} name
     */
    constructor(name) {
        super()
        this.name = name
    }
}