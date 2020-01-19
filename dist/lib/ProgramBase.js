"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgramBase {
    constructor({ valuedFlags, positionalArguments, flags, programMetadata }) {
        this.valuedFlags = valuedFlags;
        this.positionalArguments = positionalArguments;
        this.flags = flags;
        this.programMetadata = programMetadata;
    }
}
exports.default = ProgramBase;
