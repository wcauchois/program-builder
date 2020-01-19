"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgramBase {
    constructor({ valuedFlags, positionalArguments, booleanFlags, programMetadata }) {
        this.valuedFlags = valuedFlags;
        this.positionalArguments = positionalArguments;
        this.booleanFlags = booleanFlags;
        this.programMetadata = programMetadata;
    }
}
exports.default = ProgramBase;
