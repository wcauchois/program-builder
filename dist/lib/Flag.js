"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    generateHelpColumns() {
        return [this.allNames.join(", "), this.metadata.description].filter(x => x);
    }
}
exports.default = Flag;
