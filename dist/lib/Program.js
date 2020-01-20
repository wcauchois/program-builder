"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const util = require("util");
const ProgramBase_1 = __importDefault(require("./ProgramBase"));
const TableWriter_1 = __importDefault(require("./TableWriter"));
const ArgumentParser_1 = __importDefault(require("./ArgumentParser"));
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
        const parser = new ArgumentParser_1.default({
            booleanFlags: this.booleanFlags,
            positionalArguments: this.positionalArguments,
            valuedFlags: this.valuedFlags
        });
        parser.consumeAll(rawArgs);
        parser.validate();
        return parser.parsedArgs;
    }
}
exports.default = Program;
Program.helpArgumentsSet = new Set(["-h", "--help"]);
