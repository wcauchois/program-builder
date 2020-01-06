"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class KeywordArgument {
    constructor(names, dest, converter, metadata, order) {
        const invalidNames = names.filter(name => !utils_1.isFlag(name));
        if (invalidNames.length > 0) {
            // There might be a better place for this..
            console.error(`Error constructing program: Flag names must start with "-". Provided: ${invalidNames.join(", ")}`);
            process.exit(1);
        }
        this.names = names;
        this.dest = dest;
        this.converter = converter;
        this.metadata = metadata;
        this.order = order;
    }
    get firstName() {
        return this.names[0];
    }
    generateHelpColumns() {
        return [
            `${this.names.join(", ")} [${this.metadata.metavar || this.dest}]`,
            this.metadata.description
        ].filter(x => x);
    }
}
exports.default = KeywordArgument;
