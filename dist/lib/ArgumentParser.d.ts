import ValuedFlag from "./ValuedFlag";
import PositionalArguments from "./PositionalArguments";
import BooleanFlag from "./BooleanFlag";
declare type ParseState = {
    kind: "Default";
} | {
    kind: "ConsumingValuedFlag";
    flag: ValuedFlag;
    flagNameUsed: string;
};
export interface IArgumentParserOptions {
    valuedFlags: ValuedFlag[];
    positionalArguments: PositionalArguments;
    booleanFlags: BooleanFlag[];
}
export default class ArgumentParser {
    state: ParseState;
    readonly options: IArgumentParserOptions;
    readonly parsedArgs: {
        [key: string]: any;
    };
    private readonly flagsByName;
    private readonly requiredArgumentStack;
    private readonly optionalArgumentStack;
    private unspecifiedRequiredFlags;
    private unspecifiedOptionalFlags;
    private unspecifiedBooleanFlags;
    constructor(options: IArgumentParserOptions);
    consume(currentArg: string): void;
    setUnspecified(): void;
    consumeAll(args: string[]): void;
    validate(): void;
}
export {};
