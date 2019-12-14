"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArgumentError extends Error {
}
class Flag {
    constructor(key, positiveNames, negativeNames) {
        this.key = key;
        this.positiveNames = positiveNames;
        this.negativeNames = negativeNames;
    }
}
const intRegex = /^-?[0-9]+$/;
function validInt(s) {
    return intRegex.test(s);
}
function validFloat(s) {
    return !isNaN(parseFloat(s));
}
class BaseArgument {
    constructor(key, names, metadata) {
        this.key = key;
        this.names = Array.isArray(names) ? names : [names];
        this.metadata = metadata;
    }
    convert(inputString) {
        return inputString;
    }
}
class StringArgument extends BaseArgument {
}
class IntArgument extends BaseArgument {
    convert(inputString) {
        if (!validInt(inputString)) {
            throw new ArgumentError('TODO');
        }
        return parseInt(inputString, 10);
    }
}
class FloatArgument extends BaseArgument {
    convert(inputString) {
        if (!validFloat(inputString)) {
            throw new ArgumentError('TODO');
        }
        return parseFloat(inputString);
    }
}
class ProgramBase {
    constructor(argumentRegistry, programMetadata) {
        this.argumentRegistry = argumentRegistry;
        this.programMetadata = programMetadata;
    }
}
class ProgramBuilder extends ProgramBase {
    constructor(argumentRegistry, programMetadata) {
        super(argumentRegistry, programMetadata);
    }
    withArgument(argument) {
        this.argumentRegistry.push(argument);
        return this;
    }
    optionsToMetadata(options) {
        return {
            description: options.description,
            required: !!options.required
        };
    }
    /**
     * Set the program description.
     *
     * @param newDescription The new description for the program.
     */
    description(newDescription) {
        this.programMetadata.description = newDescription;
        return this;
    }
    stringArg(key, names, options) {
        return this.withArgument(new StringArgument(key, names, this.optionsToMetadata(options)));
    }
    intArg(key, names, options) {
        return this.withArgument(new IntArgument(key, names, this.optionsToMetadata(options)));
    }
    floatArg(key, names, options) {
        return this.withArgument(new FloatArgument(key, names, this.optionsToMetadata(options)));
    }
    flag(name) {
        // TODO
    }
    build() {
        return new Program(this.argumentRegistry, this.programMetadata);
    }
    static newProgram() {
        return new ProgramBuilder([], {});
    }
}
exports.default = ProgramBuilder;
class ParseError extends Error {
}
class Program extends ProgramBase {
    constructor(argumentRegistry, programMetadata) {
        super(argumentRegistry, programMetadata);
        this.argumentMap = new Map(argumentRegistry.flatMap(argument => argument.names.map(name => [name, argument])));
    }
    generateHelpText() {
        let buffer = '';
        buffer += `program\n\n`;
        for (const argument of this.argumentRegistry) {
            buffer += `  ${argument.names.join(', ')}`;
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
        if (parseResult.resultType === 'help') {
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
        let unspecifiedRequiredArguments = this.argumentRegistry.filter(argument => argument.metadata.required);
        while (currentArg = argStack.shift()) {
            if (Program.helpArgumentsSet.has(currentArg)) {
                return { resultType: 'help' };
            }
            const argument = this.argumentMap.get(currentArg);
            if (argument) {
                const argumentValue = argStack.shift();
                if (!argumentValue) {
                    throw new ParseError(`Missing argument value`);
                }
                currentParsedArgs[argument.key] = argument.convert(argumentValue);
                unspecifiedRequiredArguments = unspecifiedRequiredArguments.filter(a => argument !== a);
                continue;
            }
            throw new ParseError(`Unrecognized argument`);
        }
        if (unspecifiedRequiredArguments.length > 0) {
            throw new ParseError(`Missing required arguments`);
        }
        return {
            resultType: 'arguments',
            parsedArgs: currentParsedArgs
        };
    }
}
Program.helpArgumentsSet = new Set(['-h', '--help']);
