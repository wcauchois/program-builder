"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FlagDocumentation_1 = __importDefault(require("./FlagDocumentation"));
class Flag {
    constructor(dest, positiveNames, negativeNames, theDefault, metadata, order) {
        this.dest = dest;
        this.positiveNames = positiveNames;
        this.negativeNames = negativeNames;
        this.default = theDefault;
        this.metadata = metadata;
        this.order = order;
    }
    isPositiveName(name) {
        return this.positiveNames.includes(name);
    }
    get allNames() {
        return this.positiveNames.concat(this.negativeNames);
    }
    getDocumentation() {
        const nameSpec = this.allNames.join(", ");
        return new FlagDocumentation_1.default(nameSpec, this.metadata.description);
    }
}
exports.default = Flag;
