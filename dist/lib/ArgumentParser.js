"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArgumentParser {
    constructor(options) {
        this.state = { kind: "Default" };
        this.options = options;
        this.parsedArgs = {};
    }
    consume(arg) {
    }
    consumeAll(args) {
    }
    validate() {
    }
}
exports.default = ArgumentParser;
