"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const util = require("util");
const ProgramBase_1 = __importDefault(require("./ProgramBase"));
const ValuedFlag_1 = __importDefault(require("./ValuedFlag"));
const errors_1 = require("./errors");
const utils_1 = require("./utils");
const BooleanFlag_1 = __importDefault(require("./BooleanFlag"));
const TableWriter_1 = __importDefault(require("./TableWriter"));
function rightPad(s, n) {
    let r = s;
    while (r.length < n) {
        r = r + " ";
    }
    return r;
}
function renderColumnarData(data, padding = 2) {
    const maxColumnLengths = new Map();
    for (const row of data) {
        for (let colNum = 0; colNum < row.length; colNum++) {
            maxColumnLengths.set(colNum, Math.max(maxColumnLengths.get(colNum) || 0, row[colNum].length));
        }
    }
    const lines = [];
    for (const row of data) {
        const paddedCols = row.map((col, i) => rightPad(col, (maxColumnLengths.get(i) || 0) + padding));
        lines.push(rightPad("", padding) + paddedCols.join(""));
    }
    return lines.join("\n");
}
/**
 * A built program that can parse arguments and execute a main function
 * against those arguments.
 *
 * @remarks
 * Construct a Program using a {@link ProgramBuilder}, then call {@link Program.exec}
 * to execute your main function.
 *
 * Example:
 *
 * ```typescript
 * const program = ProgramBuilder.newBuilder().build();
 * program.exec(args => {
 *   // Do things with args
 * });
 * ```
 */
class Program extends ProgramBase_1.default {
    constructor(options) {
        super(options);
        this.flagsByName = new Map(options.valuedFlags
            .flatMap(vflag => vflag.names.map(name => [name, vflag]))
            .concat(options.booleanFlags.flatMap(flag => flag.allNames.map(name => [name, flag]))));
    }
    generateHelpText() {
        let buffer = "";
        const haveAnyFlags = this.valuedFlags.length > 0 || this.booleanFlags.length > 0;
        // Usage
        const usageParts = [
            path.basename(process.argv[1]),
            haveAnyFlags ? "[options]" : undefined,
            this.positionalArguments.nonEmpty
                ? this.positionalArguments.getSpecForUsage()
                : undefined
        ].filter(x => x);
        buffer += `Usage: ${usageParts.join(" ")}`;
        // Description
        if (this.programMetadata.description) {
            buffer += `\n\n${this.programMetadata.description}`;
        }
        // Flags
        if (haveAnyFlags) {
            const allFlagsSorted = this.valuedFlags.concat(this.booleanFlags);
            allFlagsSorted.sort((a, b) => a.order - b.order);
            buffer += `\n\nOptions:\n`;
            const tw = new TableWriter_1.default();
            allFlagsSorted.forEach(f => f.getDocumentation().writeTo(tw));
            buffer += tw.toString();
        }
        return buffer;
    }
    isHelpRequested(args) {
        return args.length > 0 && Program.helpArgumentsSet.has(args[0]);
    }
    printHelp() {
        const helpText = this.generateHelpText();
        console.log(helpText);
    }
    async execOrThrow(main, rawArgs) {
        if (!rawArgs) {
            rawArgs = process.argv.slice(2);
        }
        if (this.isHelpRequested(rawArgs)) {
            this.printHelp();
            return;
        }
        const parsedArgs = this.parseArgs(rawArgs);
        await main(parsedArgs);
    }
    formatError(err) {
        if (typeof err.message === "string") {
            return err.message;
        }
        else if (typeof err === "string") {
            return err;
        }
        else {
            return util.inspect(err);
        }
    }
    exec(main, rawArgs) {
        this.execOrThrow(main, rawArgs)
            .then(() => process.exit(0))
            .catch(err => {
            console.error(this.formatError(err));
            process.exit(1);
        });
    }
    parseArgs(rawArgs) {
        const argStack = rawArgs.slice();
        const parsedArgs = {};
        const requiredArgumentStack = this.positionalArguments.required.slice();
        const optionalArgumentStack = this.positionalArguments.optional.slice();
        let currentArg;
        let unspecifiedRequiredVFlags = this.valuedFlags.filter(vflag => vflag.metadata.required);
        while ((currentArg = argStack.shift())) {
            if (utils_1.isFlag(currentArg)) {
                const flag = this.flagsByName.get(currentArg);
                if (!flag) {
                    throw new errors_1.ArgumentError(`Unrecognized flag: ${currentArg}`);
                }
                if (flag instanceof BooleanFlag_1.default) {
                    parsedArgs[flag.dest] = flag.isPositiveName(currentArg); // Else, it is a negative name.
                }
                else if (flag instanceof ValuedFlag_1.default) {
                    const argumentValue = argStack.shift();
                    if (!argumentValue) {
                        throw new errors_1.ArgumentError(`Missing value for flag '${currentArg}'`);
                    }
                    parsedArgs[flag.dest] = flag.converter(argumentValue, currentArg);
                    unspecifiedRequiredVFlags = unspecifiedRequiredVFlags.filter(x => x !== flag);
                }
                else {
                    utils_1.expectUnreachable(flag);
                }
            }
            else {
                let arg;
                if (requiredArgumentStack.length > 0) {
                    arg = requiredArgumentStack.shift();
                }
                else if (optionalArgumentStack.length > 0) {
                    arg = optionalArgumentStack.shift();
                }
                if (!arg) {
                    throw new errors_1.TooManyArgumentsError();
                }
                parsedArgs[arg.dest] = currentArg;
            }
        }
        // Validate that all required arguments were specified
        if (requiredArgumentStack.length > 0) {
            throw new errors_1.ArgumentError(`Not enough positional arguments were specified. Expected: at least ${this.positionalArguments.required.length}`);
        }
        if (unspecifiedRequiredVFlags.length > 0) {
            throw new errors_1.ArgumentError(`The following required flags were not specified: ${unspecifiedRequiredVFlags
                .map(x => x.firstName)
                .join(", ")}`);
        }
        return parsedArgs;
    }
}
exports.default = Program;
Program.helpArgumentsSet = new Set(["-h", "--help"]);
