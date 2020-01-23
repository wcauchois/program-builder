"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const FlagDocumentation_1 = __importDefault(require("./FlagDocumentation"));
class ValuedFlag {
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
    get default() {
        return this.metadata.default;
    }
    get required() {
        return this.metadata.required;
    }
    get firstName() {
        return this.names[0];
    }
    getDocumentation() {
        const [lchar, rchar] = utils_1.getSurroundingChars(this.required);
        const nameSpec = `${this.names.join(", ")} ${lchar}${this.metadata
            .metavar || this.dest}${rchar}`;
        return new FlagDocumentation_1.default(nameSpec, this.metadata.description);
    }
}
exports.default = ValuedFlag;
