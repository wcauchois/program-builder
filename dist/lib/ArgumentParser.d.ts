import ValuedFlag from "./ValuedFlag";
import PositionalArguments from "./PositionalArguments";
import BooleanFlag from "./BooleanFlag";
declare type ParseState = {
    kind: "Default";
} | {
    kind: "ConsumingValuedFlag";
    flag: ValuedFlag;
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
    constructor(options: IArgumentParserOptions);
    consume(arg: string): void;
    consumeAll(args: string[]): void;
    validate(): void;
}
export {};
