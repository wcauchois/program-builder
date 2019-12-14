"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgramBase {
    constructor(keywordArguments, programMetadata, positionalArguments) {
        this.keywordArguments = keywordArguments;
        this.programMetadata = programMetadata;
        this.positionalArguments = positionalArguments;
    }
}
exports.default = ProgramBase;
