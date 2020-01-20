import ValuedFlag from "./ValuedFlag";
import PositionalArguments from "./PositionalArguments";
import BooleanFlag from "./BooleanFlag";
import PositionalArgument from "./PositionalArgument";
import { isFlag, expectUnreachable } from "./utils";
import { ArgumentError, TooManyArgumentsError } from "./errors";

type ParseState = {
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
  readonly parsedArgs: { [key: string]: any };

  private readonly flagsByName: Map<string, ValuedFlag | BooleanFlag>;
  private readonly requiredArgumentStack: PositionalArgument[];
  private readonly optionalArgumentStack: PositionalArgument[];
  private unspecifiedRequiredValuedFlags: ValuedFlag[];

  constructor(options: IArgumentParserOptions) {
    this.state = { kind: "Default" };
    this.options = options;
    this.parsedArgs = {};

    this.flagsByName = new Map(
      options.valuedFlags
        .flatMap(vflag =>
          vflag.names.map(name => [name, vflag] as [string, ValuedFlag | BooleanFlag])
        )
        .concat(
          options.booleanFlags.flatMap(flag =>
            flag.allNames.map(
              name => [name, flag] as [string, ValuedFlag | BooleanFlag]
            )
          )
        )
    );

    this.requiredArgumentStack = [];
    this.optionalArgumentStack = [];
    this.unspecifiedRequiredValuedFlags = options.valuedFlags.filter(
      flag => flag.metadata.required
    );
  }

  consume(currentArg: string) {
    if (this.state.kind === "ConsumingValuedFlag") {
      const { flag } = this.state;
      this.parsedArgs[flag.dest] = flag.converter(currentArg, this.state.flagNameUsed);
      this.unspecifiedRequiredValuedFlags = this.unspecifiedRequiredValuedFlags.filter(
        x => x !== flag
      );
    } else if (this.state.kind === "Default") {
      if (isFlag(currentArg)) {
        const flag = this.flagsByName.get(currentArg);
        if (!flag) {
          throw new ArgumentError(`Unrecognized flag: ${currentArg}`);
        }
        if (flag instanceof BooleanFlag) {
          this.parsedArgs[flag.dest] = flag.isPositiveName(currentArg); // Else, it is a negative name.
        } else if (flag instanceof ValuedFlag) {
          this.state = {
            kind: "ConsumingValuedFlag",
            flag,
            flagNameUsed: currentArg
          };
        } else {
          expectUnreachable(flag);
        }
      } else {
        let arg: PositionalArgument | undefined;
        if (this.requiredArgumentStack.length > 0) {
          arg = this.requiredArgumentStack.shift();
        } else if (this.optionalArgumentStack.length > 0) {
          arg = this.optionalArgumentStack.shift();
        }
        if (!arg) {
          throw new TooManyArgumentsError();
        }
        this.parsedArgs[arg.dest] = currentArg;
      }
    } else {
      expectUnreachable(this.state);
    }
  }

  consumeAll(args: string[]) {
    args.forEach(arg => this.consume(arg));
  }

  validate() {
    if (this.state.kind === "ConsumingValuedFlag") {
      throw new ArgumentError(`Missing value for flag '${this.state.flagNameUsed}'`);
    }

    if (this.requiredArgumentStack.length > 0) {
      throw new ArgumentError(
        `Not enough positional arguments were specified. Expected: at least ${this.options.positionalArguments.required.length}`
      );
    }

    if (this.unspecifiedRequiredValuedFlags.length > 0) {
      throw new ArgumentError(
        `The following required flags were not specified: ${this.unspecifiedRequiredValuedFlags
          .map(x => x.firstName)
          .join(", ")}`
      );
    }
  }
}
