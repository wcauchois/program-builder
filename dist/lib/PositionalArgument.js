"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PositionalArgument {
    constructor(dest, index, required) {
        this.dest = dest;
        this.index = index;
        this.required = required;
    }
}
exports.default = PositionalArgument;
