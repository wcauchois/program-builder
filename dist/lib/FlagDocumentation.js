"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Encapsulates documentation about a {@link Flag} or {@link ValuedFlag}.
 */
class FlagDocumentation {
    constructor(nameSpec, description) {
        this.nameSpec = nameSpec;
        this.description = description;
    }
    /**
     * @internal
     */
    writeTo(tw) {
        tw.writeRow([this.nameSpec, this.description || ""]);
    }
}
exports.default = FlagDocumentation;
