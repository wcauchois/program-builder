"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramBase_1 = __importDefault(require("./ProgramBase"));
const TableWriter_1 = __importDefault(require("./TableWriter"));
const ArgumentParser_1 = __importDefault(require("./ArgumentParser"));
const ProgramHelpers_1 = __importDefault(require("./ProgramHelpers"));
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
        this.helpers = new ProgramHelpers_1.default();
    }
    generateHelpText(extraUsage) {
        let buffer = "";
        const haveAnyFlags = this.valuedFlags.length > 0 || this.booleanFlags.length > 0;
        // Usage
        const usageParts = [
            this.helpers.getProgramName(),
            extraUsage,
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
        // Arguments
        if (this.positionalArguments.haveAnyDescription) {
            buffer += "\n\nArguments:\n";
            const tw = new TableWriter_1.default();
            this.positionalArguments.all.forEach(arg => arg.writeDocumentationTo(tw));
            buffer += tw.toString();
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
    async execOrThrow(main, rawArgs, extraUsage) {
        if (!rawArgs) {
            rawArgs = process.argv.slice(2);
        }
        if (this.helpers.isHelpRequested(rawArgs)) {
            console.log(this.generateHelpText(extraUsage));
            return;
        }
        const parsedArgs = this.parseArgs(rawArgs);
        await main(parsedArgs);
    }
    exec(main, rawArgs) {
        this.helpers.execAndExit(() => this.execOrThrow(main, rawArgs));
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
