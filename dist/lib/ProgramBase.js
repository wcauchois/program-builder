"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgramBase {
    constructor({ keywordArguments, positionalArguments, flags, programMetadata }) {
        this.keywordArguments = keywordArguments;
        this.positionalArguments = positionalArguments;
        this.flags = flags;
        this.programMetadata = programMetadata;
    }
}
exports.default = ProgramBase;
