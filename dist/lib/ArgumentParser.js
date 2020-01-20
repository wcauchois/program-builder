"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValuedFlag_1 = __importDefault(require("./ValuedFlag"));
const BooleanFlag_1 = __importDefault(require("./BooleanFlag"));
const utils_1 = require("./utils");
const errors_1 = require("./errors");
class ArgumentParser {
    constructor(options) {
        this.state = { kind: "Default" };
        this.options = options;
        this.parsedArgs = {};
        this.flagsByName = new Map(options.valuedFlags
            .flatMap(vflag => vflag.names.map(name => [name, vflag]))
            .concat(options.booleanFlags.flatMap(flag => flag.allNames.map(name => [name, flag]))));
        this.requiredArgumentStack = [];
        this.optionalArgumentStack = [];
        this.unspecifiedRequiredValuedFlags = options.valuedFlags.filter(flag => flag.metadata.required);
    }
    consume(currentArg) {
        if (this.state.kind === "ConsumingValuedFlag") {
            const { flag } = this.state;
            this.parsedArgs[flag.dest] = flag.converter(currentArg, this.state.flagNameUsed);
            this.unspecifiedRequiredValuedFlags = this.unspecifiedRequiredValuedFlags.filter(x => x !== flag);
        }
        else if (this.state.kind === "Default") {
            if (utils_1.isFlag(currentArg)) {
                const flag = this.flagsByName.get(currentArg);
                if (!flag) {
                    throw new errors_1.ArgumentError(`Unrecognized flag: ${currentArg}`);
                }
                if (flag instanceof BooleanFlag_1.default) {
                    this.parsedArgs[flag.dest] = flag.isPositiveName(currentArg); // Else, it is a negative name.
                }
                else if (flag instanceof ValuedFlag_1.default) {
                    this.state = {
                        kind: "ConsumingValuedFlag",
                        flag,
                        flagNameUsed: currentArg
                    };
                }
                else {
                    utils_1.expectUnreachable(flag);
                }
            }
            else {
                let arg;
                if (this.requiredArgumentStack.length > 0) {
                    arg = this.requiredArgumentStack.shift();
                }
                else if (this.optionalArgumentStack.length > 0) {
                    arg = this.optionalArgumentStack.shift();
                }
                if (!arg) {
                    throw new errors_1.TooManyArgumentsError();
                }
                this.parsedArgs[arg.dest] = currentArg;
            }
        }
        else {
            utils_1.expectUnreachable(this.state);
        }
    }
    consumeAll(args) {
        args.forEach(arg => this.consume(arg));
    }
    validate() {
        if (this.state.kind === "ConsumingValuedFlag") {
            throw new errors_1.ArgumentError(`Missing value for flag '${this.state.flagNameUsed}'`);
        }
        if (this.requiredArgumentStack.length > 0) {
            throw new errors_1.ArgumentError(`Not enough positional arguments were specified. Expected: at least ${this.options.positionalArguments.required.length}`);
        }
        if (this.unspecifiedRequiredValuedFlags.length > 0) {
            throw new errors_1.ArgumentError(`The following required flags were not specified: ${this.unspecifiedRequiredValuedFlags
                .map(x => x.firstName)
                .join(", ")}`);
        }
    }
}
exports.default = ArgumentParser;
