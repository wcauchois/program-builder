"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramBase_1 = __importDefault(require("./ProgramBase"));
const PositionalArgument_1 = __importDefault(require("./PositionalArgument"));
const Program_1 = __importDefault(require("./Program"));
const ValuedFlag_1 = __importDefault(require("./ValuedFlag"));
const PositionalArguments_1 = __importDefault(require("./PositionalArguments"));
const converters_1 = require("./converters");
const BooleanFlag_1 = __importDefault(require("./BooleanFlag"));
const ProgramWithAction_1 = __importDefault(require("./ProgramWithAction"));
const ProgramWithSubcommands_1 = __importDefault(require("./ProgramWithSubcommands"));
/**
 * Entry point to the library and the way to start constructing a {@link Program} to
 * be executed.
 *
 * @remarks
 * Create a new ProgramBuilder with {@link ProgramBuilder.newBuilder}, then define flags
 * using the instance methods. Finally, call {@link ProgramBuilder.build} to get an
 * executable Program.
 *
 * There are a few categories to configure:
 *
 * ### Positional arguments
 *
 * Use `arg` or `optionalArg` to define positional arguments.
 *
 * Example:
 *
 * ```typescript
 * const program = ProgramBuilder.newBuilder()
 *   .arg('filename', { description: 'The filename to use' })
 *   .optionalArg('extraFilename')
 *   .build();
 * ```
 *
 * Invoked as:
 *
 * ```
 * $ my-program foo.txt bar.txt
 * ```
 *
 * ### Boolean flags
 *
 * Use `flag` to define a boolean flag that is set by its presence.
 *
 * ### Valued flags
 *
 * Use methods like `stringFlag` and `intFlag` to define "valued" flags,
 * known as options in other CLI libraries. For these, the user must specify a value
 * immediately following the flag, like "--count 42". The value is converted to
 * a type indicated by the name of the method.
 */
class ProgramBuilder extends ProgramBase_1.default {
    constructor(options) {
        super(options);
        this.flagNumber = 0;
    }
    keywordOptionsToMetadata(options) {
        return {
            description: options.description,
            default: options.default,
            required: typeof options.default === "undefined",
            metavar: options.metavar
        };
    }
    splitNames(names) {
        return names.split(",").map(x => x.trim());
    }
    /**
     * Set the program description.
     *
     * @param newDescription - The new description for the program.
     */
    description(newDescription) {
        this.programMetadata.description = newDescription;
        return this;
    }
    /**
     * Add a positional argument to the program.
     *
     * @param dest - The destination key into which the argument value will be stored.
     * @param options - See {@link IPositionalArgumentMetadata}.
     *
     * @remarks
     * The order in which you call `arg` on a ProgramBuilder matters.
     */
    arg(dest, options = {}) {
        this.positionalArguments.push(new PositionalArgument_1.default(dest, options, true));
        return this;
    }
    /**
     * Add an optional positional argument to the program.
     *
     * @param dest - The destination key into which the argument value will be stored.
     * @param options - See {@link IPositionalArgumentMetadata}.
     */
    optionalArg(dest, options = {}) {
        this.positionalArguments.pushOptional(new PositionalArgument_1.default(dest, options, false));
        return this;
    }
    customFlag(name, options, converter) {
        this.valuedFlags.push(new ValuedFlag_1.default(this.splitNames(name), options.dest, converter, this.keywordOptionsToMetadata(options), ++this.flagNumber));
        return this;
    }
    stringFlag(name, options) {
        return this.customFlag(name, options, converters_1.convertString);
    }
    intFlag(name, options) {
        return this.customFlag(name, options, converters_1.convertInt);
    }
    floatFlag(name, options) {
        return this.customFlag(name, options, converters_1.convertFloat);
    }
    // #endregion
    /**
     * Add a boolean-valued flag to the program (sometimes known as a "switch").
     *
     * @param name - The name for the flag, including leading dashes. Multiple alternative
     * names may be specified by separating them within the string by commas. For example,
     * `"-i,--input"`.
     * @param options - See {@link IBooleanFlagOptions}.
     */
    flag(name, options) {
        const names = this.splitNames(name);
        const inverted = typeof options.inverted === "boolean"
            ? options.inverted
            : names[0].startsWith("--no");
        const metadata = {
            description: options.description,
            metavar: options.metavar
        };
        this.booleanFlags.push(new BooleanFlag_1.default(options.dest, !inverted ? names : [], inverted ? [] : names, inverted, metadata, ++this.flagNumber));
        return this;
    }
    apply(fn) {
        return fn(this);
    }
    /**
     * Build and return a {@link Program}.
     */
    build() {
        return new Program_1.default(this);
    }
    /**
     * Bind the ProgramBuilder to an action and return a {@link ProgramWithAction}
     * suitable for use constructing subcommands.
     */
    bind(action) {
        return new ProgramWithAction_1.default(this, action);
    }
    /**
     * Build a {@link ProgramWithSubcommands} using a map of {@link ProgramWithAction}s.
     */
    static buildWithSubcommands(subcommandMap, metadata = {}) {
        return new ProgramWithSubcommands_1.default(subcommandMap, metadata);
    }
    /**
     * Create a new ProgramBuilder instance.
     */
    static newBuilder() {
        return new ProgramBuilder({
            booleanFlags: [],
            valuedFlags: [],
            positionalArguments: new PositionalArguments_1.default(),
            programMetadata: {}
        });
    }
}
exports.default = ProgramBuilder;
