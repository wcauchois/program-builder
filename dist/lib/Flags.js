"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Flags {
    constructor(booleanFlags, valuedFlags) {
        this.booleanFlags = booleanFlags;
        this.valuedFlags = valuedFlags;
    }
    merge(other) {
        return new Flags(this.booleanFlags.concat(other.booleanFlags), this.valuedFlags.concat(other.valuedFlags));
    }
}
exports.default = Flags;
