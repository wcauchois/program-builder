"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PositionalArgument {
    constructor(dest, metadata) {
        this.dest = dest;
        this.metadata = metadata;
    }
    get destOrMetavar() {
        var _a;
        return _a = this.dest, (_a !== null && _a !== void 0 ? _a : this.metadata.metavar);
    }
}
exports.default = PositionalArgument;
