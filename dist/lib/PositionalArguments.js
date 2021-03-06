"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PositionalArguments {
    constructor() {
        this.required = [];
        this.optional = [];
    }
    push(arg) {
        this.required.push(arg);
    }
    pushOptional(arg) {
        this.optional.push(arg);
    }
    get nonEmpty() {
        return this.required.length > 0 || this.optional.length > 0;
    }
    getSpecForUsage() {
        return this.required
            .map(x => `<${x.destOrMetavar}>`)
            .concat(this.optional.map(x => `[${x.destOrMetavar}]`))
            .join(" ");
    }
    get haveAnyDescription() {
        return (this.required.some(arg => arg.description) ||
            this.optional.some(arg => arg.description));
    }
    get all() {
        return this.required.concat(this.optional);
    }
}
exports.default = PositionalArguments;
