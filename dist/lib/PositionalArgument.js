"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PositionalArgument {
    constructor(dest, metadata, required) {
        this.dest = dest;
        this.metadata = metadata;
        this.required = required;
    }
    get destOrMetavar() {
        var _a;
        return _a = this.dest, (_a !== null && _a !== void 0 ? _a : this.metadata.metavar);
    }
    get description() {
        return this.metadata.description;
    }
    /**
     * @internal
     */
    writeDocumentationTo(tw) {
        tw.writeRow([
            `${this.metadata.metavar || this.dest}`,
            (this.description || "") + (this.required ? "" : " (optional)")
        ]);
    }
}
exports.default = PositionalArgument;
