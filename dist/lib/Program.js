"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const errors_1 = require("./errors");
const ProgramBase_1 = __importDefault(require("./ProgramBase"));
class Program extends ProgramBase_1.default {
    constructor(keywordArguments, programMetadata, positionalArguments) {
        super(keywordArguments, programMetadata, positionalArguments);
        this.keywordArgumentMap = new Map(keywordArguments.flatMap(argument => argument.names.map(name => [name, argument])));
    }
    generateHelpText() {
        let buffer = "";
        buffer += `Usage: ${path.basename(process.argv[1])}`;
        // TODO: Positional args
        buffer += "\n\n";
        for (const argument of this.keywordArguments) {
            buffer += `  ${argument.names.join(", ")}`;
        }
        return buffer;
    }
    exec(main, rawArgs) {
        if (!rawArgs) {
            rawArgs = process.argv.slice(2);
        }
        let parseResult;
        try {
            parseResult = this.parse(rawArgs);
        }
        catch (err) {
            console.error(`Error parsing commandline arguments: ${err.message}`);
            process.exit(1);
            throw new Error(); // TEMP: Isn't there supposed to be better handling for never-returning functions?
        }
        if (parseResult.resultType === "help") {
            const helpText = this.generateHelpText();
            console.log(helpText);
            process.exit(0); // TODO: Is this the right return code?
        }
        else {
            const args = parseResult.parsedArgs;
            const mainResult = Promise.resolve().then(() => main(args));
            mainResult
                .then(() => process.exit(0))
                .catch(err => {
                console.error(err.message || err);
                process.exit(1);
            });
        }
    }
    parse(rawArgs) {
        const argStack = rawArgs.slice();
        let currentParsedArgs = {};
        let currentArg;
        let unspecifiedRequiredArguments = this.keywordArguments.filter(argument => argument.metadata.required);
        while ((currentArg = argStack.shift())) {
            if (Program.helpArgumentsSet.has(currentArg)) {
                return { resultType: "help" };
            }
            const argument = this.keywordArgumentMap.get(currentArg);
            if (argument) {
                const argumentValue = argStack.shift();
                if (!argumentValue) {
                    throw new errors_1.ParseError(`Missing argument value`);
                }
                currentParsedArgs[argument.dest] = argument.convert(argumentValue);
                unspecifiedRequiredArguments = unspecifiedRequiredArguments.filter(a => argument !== a);
                continue;
            }
            throw new errors_1.ParseError(`Unrecognized argument: ${currentArg}`);
        }
        if (unspecifiedRequiredArguments.length > 0) {
            throw new errors_1.ParseError(`Missing required arguments`);
        }
        return {
            resultType: "arguments",
            parsedArgs: currentParsedArgs
        };
    }
}
exports.default = Program;
Program.helpArgumentsSet = new Set(["-h", "--help"]);
