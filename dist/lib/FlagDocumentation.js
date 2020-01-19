"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlagDocumentation {
    constructor(nameSpec, description) {
        this.nameSpec = nameSpec;
        this.description = description;
    }
    writeTo(tw) {
        tw.writeRow([this.nameSpec, this.description || ""]);
    }
}
exports.default = FlagDocumentation;
