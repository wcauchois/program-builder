"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramBase_1 = __importDefault(require("./ProgramBase"));
const PositionalArgument_1 = __importDefault(require("./PositionalArgument"));
const keywordArguments_1 = require("./keywordArguments");
const Program_1 = __importDefault(require("./Program"));
class ProgramBuilder extends ProgramBase_1.default {
    constructor(keywordArguments, programMetadata, positionalArguments) {
        super(keywordArguments, programMetadata, positionalArguments);
        this.currentArgumentPosition = 0;
    }
    withKeywordArgument(argument) {
        this.keywordArguments.push(argument);
        return this;
    }
    optionsToMetadata(options) {
        return {
            description: options.description,
            required: !!options.required
        };
    }
    convertNames(names) {
        return names.split(",").map(x => x.trim());
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
    arg(dest) {
        this.positionalArguments.push(new PositionalArgument_1.default(dest, this.currentArgumentPosition, true));
        this.currentArgumentPosition++;
        return this;
    }
    optionalArg(dest) {
        this.positionalArguments.push(new PositionalArgument_1.default(dest, this.currentArgumentPosition, false));
        this.currentArgumentPosition++;
        return this;
    }
    stringArg(names, options) {
        return this.withKeywordArgument(new keywordArguments_1.StringKeywordArgument(options.dest, this.convertNames(names), this.optionsToMetadata(options)));
    }
    intArg(names, options) {
        return this.withKeywordArgument(new keywordArguments_1.IntKeywordArgument(options.dest, this.convertNames(names), this.optionsToMetadata(options)));
    }
    floatArg(names, options) {
        return this.withKeywordArgument(new keywordArguments_1.FloatKeywordArgument(options.dest, this.convertNames(names), this.optionsToMetadata(options)));
    }
    flag(name) {
        // TODO
    }
    build() {
        return new Program_1.default(this.keywordArguments, this.programMetadata, this.positionalArguments);
    }
    static newProgram() {
        return new ProgramBuilder([], {}, []);
    }
}
exports.default = ProgramBuilder;
