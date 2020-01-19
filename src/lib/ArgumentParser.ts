import ValuedFlag from "./ValuedFlag";
import PositionalArguments from "./PositionalArguments";
import BooleanFlag from "./BooleanFlag";

type ParseState = {
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
  readonly parsedArgs: { [key: string]: any };

  constructor(options: IArgumentParserOptions) {
    this.state = { kind: "Default" };
    this.options = options;
    this.parsedArgs = {};
  }

  consume(arg: string) {
  }

  consumeAll(args: string[]) {
  }

  validate() {
  }
}
