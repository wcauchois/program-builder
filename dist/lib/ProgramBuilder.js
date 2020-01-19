"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramBase_1 = __importDefault(require("./ProgramBase"));
const PositionalArgument_1 = __importDefault(require("./PositionalArgument"));
const Program_1 = __importDefault(require("./Program"));
const KeywordArgument_1 = __importDefault(require("./KeywordArgument"));
const PositionalArguments_1 = __importDefault(require("./PositionalArguments"));
const converters_1 = require("./converters");
const Flag_1 = __importDefault(require("./Flag"));
const ProgramWithAction_1 = __importDefault(require("./ProgramWithAction"));
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
    arg(dest, options = {}) {
        this.positionalArguments.push(new PositionalArgument_1.default(dest, options));
        return this;
    }
    optionalArg(dest, options = {}) {
        this.positionalArguments.pushOptional(new PositionalArgument_1.default(dest, options));
        return this;
    }
    customFlag(name, options, converter) {
        this.keywordArguments.push(new KeywordArgument_1.default(this.splitNames(name), options.dest, converter, this.keywordOptionsToMetadata(options), ++this.flagNumber));
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
    flag(name, options) {
        const names = this.splitNames(name);
        const inverted = typeof options.inverted === "boolean"
            ? options.inverted
            : names[0].startsWith("--no");
        const metadata = {
            description: options.description,
            metavar: options.metavar
        };
        this.flags.push(new Flag_1.default(options.dest, !inverted ? names : [], inverted ? [] : names, inverted, metadata, ++this.flagNumber));
        return this;
    }
    build() {
        return new Program_1.default(this);
    }
    bind(action) {
        return new ProgramWithAction_1.default(this, action);
    }
    static newBuilder() {
        return new ProgramBuilder({
            flags: [],
            keywordArguments: [],
            positionalArguments: new PositionalArguments_1.default(),
            programMetadata: {}
        });
    }
}
exports.default = ProgramBuilder;
