import path = require('path');

interface IKeywordArgumentMetadata {
  required: boolean;
  description?: string;
}

class ArgumentError extends Error {}

interface IKeywordArgument {
  readonly dest: string;

  /**
   * Names for this argument including short names (i.e. `-s`, `--string`).
   */
  readonly names: string[];

  readonly metadata: IKeywordArgumentMetadata;

  convert(inputString: string): any;
}

interface IFlag {
  readonly dest: string;

  readonly positiveNames: string[];

  readonly negativeNames: string[];
}

class Flag implements IFlag {
  readonly dest: string;
  readonly positiveNames: string[];
  readonly negativeNames: string[];

  constructor(dest: string, positiveNames: string[], negativeNames: string[]) {
    this.dest = dest;
    this.positiveNames = positiveNames;
    this.negativeNames = negativeNames;
  }
}

const intRegex = /^-?[0-9]+$/;

function validInt(s: string) {
  return intRegex.test(s);
}

function validFloat(s: string) {
  return !isNaN(parseFloat(s));
}

abstract class BaseKeywordArgument implements IKeywordArgument {
  readonly dest: string;
  readonly names: string[];
  readonly metadata: IKeywordArgumentMetadata;

  constructor(
    dest: string,
    names: string[] | string,
    metadata: IKeywordArgumentMetadata
  ) {
    this.dest = dest;
    this.names = Array.isArray(names) ? names : [names];
    this.metadata = metadata;
  }

  convert(inputString: string): any {
    return inputString;
  }
}

class StringKeywordArgument extends BaseKeywordArgument {}

class IntKeywordArgument extends BaseKeywordArgument {
  convert(inputString: string): any {
    if (!validInt(inputString)) {
      throw new ArgumentError("TODO");
    }
    return parseInt(inputString, 10);
  }
}

class FloatKeywordArgument extends BaseKeywordArgument {
  convert(inputString: string): any {
    if (!validFloat(inputString)) {
      throw new ArgumentError("TODO");
    }
    return parseFloat(inputString);
  }
}

interface IKeywordArgumentCommonOptions<K extends string> {
  dest: K;
  description?: string;
}

interface IRequiredKeywordArgumentOptions<K extends string>
  extends IKeywordArgumentCommonOptions<K> {
  required: true;
}

interface IOptionalKeywordArgumentOptions<K extends string>
  extends IKeywordArgumentCommonOptions<K> {
  required?: false;
}

type KeywordArgumentOptions<K extends string> =
  | IRequiredKeywordArgumentOptions<K>
  | IOptionalKeywordArgumentOptions<K>;

interface IProgramMetadata {
  description?: string;
}

class PositionalArgument {
  readonly dest: string;
  readonly index: number;
  readonly required: boolean;

  constructor(dest: string, index: number, required: boolean) {
    this.dest = dest;
    this.index = index;
    this.required = required;
  }
}

abstract class ProgramBase {
  protected readonly keywordArguments: IKeywordArgument[];
  protected readonly programMetadata: IProgramMetadata;
  protected readonly positionalArguments: PositionalArgument[];

  constructor(
    keywordArguments: IKeywordArgument[],
    programMetadata: IProgramMetadata,
    positionalArguments: PositionalArgument[]
  ) {
    this.keywordArguments = keywordArguments;
    this.programMetadata = programMetadata;
    this.positionalArguments = positionalArguments;
  }
}

type ExtendProgramBuilderWithOptional<T, K extends string, U> = ProgramBuilder<
  T & { [P in K]?: U }
>;
type ExtendProgramBuilderWithRequired<T, K extends string, U> = ProgramBuilder<
  T & { [P in K]: U }
>;

export default class ProgramBuilder<T> extends ProgramBase {
  private currentArgumentPosition: number;

  private constructor(
    keywordArguments: IKeywordArgument[],
    programMetadata: IProgramMetadata,
    positionalArguments: PositionalArgument[]
  ) {
    super(keywordArguments, programMetadata, positionalArguments);
    this.currentArgumentPosition = 0;
  }

  private withArgument(argument: IKeywordArgument) {
    this.keywordArguments.push(argument);
    return this as any;
  }

  private optionsToMetadata(options: KeywordArgumentOptions<any>): IKeywordArgumentMetadata {
    return {
      description: options.description,
      required: !!options.required
    };
  }

  private convertNames(names: string): string[] {
    return names.split(",").map(x => x.trim());
  }

  /**
   * Set the program description.
   *
   * @param newDescription The new description for the program.
   */
  description(newDescription: string) {
    this.programMetadata.description = newDescription;
    return this;
  }

  arg<K extends string>(
    dest: K
  ): ExtendProgramBuilderWithRequired<T, K, string> {
    this.positionalArguments.push(new PositionalArgument(dest, this.currentArgumentPosition, true));
    this.currentArgumentPosition++;
    return this as any;
  }

  optionalArg<K extends string>(
    dest: K
  ): ExtendProgramBuilderWithOptional<T, K, string> {
    this.positionalArguments.push(new PositionalArgument(dest, this.currentArgumentPosition, false));
    this.currentArgumentPosition++;
    return this as any;
  }

  stringArg<K extends string>(
    names: string,
    options: IRequiredKeywordArgumentOptions<K>
  ): ExtendProgramBuilderWithRequired<T, K, string>;

  stringArg<K extends string>(
    names: string,
    options: IOptionalKeywordArgumentOptions<K>
  ): ExtendProgramBuilderWithOptional<T, K, string>;

  stringArg<K extends string>(names: string, options: KeywordArgumentOptions<K>) {
    return this.withArgument(
      new StringKeywordArgument(
        options.dest,
        this.convertNames(names),
        this.optionsToMetadata(options)
      )
    );
  }

  intArg<K extends string>(
    names: string,
    options: IRequiredKeywordArgumentOptions<K>
  ): ExtendProgramBuilderWithRequired<T, K, number>;

  intArg<K extends string>(
    names: string,
    options: IOptionalKeywordArgumentOptions<K>
  ): ExtendProgramBuilderWithOptional<T, K, number>;

  intArg<K extends string>(names: string, options: KeywordArgumentOptions<K>) {
    return this.withArgument(
      new IntKeywordArgument(
        options.dest,
        this.convertNames(names),
        this.optionsToMetadata(options)
      )
    );
  }

  floatArg<K extends string>(
    names: string,
    options: IRequiredKeywordArgumentOptions<K>
  ): ExtendProgramBuilderWithRequired<T, K, number>;

  floatArg<K extends string>(
    names: string,
    options: IOptionalKeywordArgumentOptions<K>
  ): ExtendProgramBuilderWithOptional<T, K, number>;

  floatArg<K extends string>(names: string, options: KeywordArgumentOptions<K>) {
    return this.withArgument(
      new FloatKeywordArgument(
        options.dest,
        this.convertNames(names),
        this.optionsToMetadata(options)
      )
    );
  }

  flag(name: string) {
    // TODO
  }

  build() {
    return new Program<T>(this.keywordArguments, this.programMetadata, this.positionalArguments);
  }

  static newProgram(): ProgramBuilder<{}> {
    return new ProgramBuilder([], {}, []);
  }
}

class ParseError extends Error {}

interface IParseHelpResult {
  resultType: "help";
}

interface IParseArgumentsResult<T> {
  resultType: "arguments";
  parsedArgs: T;
}

type ParseResult<T> = IParseHelpResult | IParseArgumentsResult<T>;

type ProgramMain<T> = ((args: T) => Promise<void>) | ((args: T) => void);

class Program<T> extends ProgramBase {
  private readonly keywordArgumentMap: Map<string, IKeywordArgument>;

  static readonly helpArgumentsSet = new Set(["-h", "--help"]);

  constructor(
    keywordArguments: IKeywordArgument[],
    programMetadata: IProgramMetadata,
    positionalArguments: PositionalArgument[]
  ) {
    super(keywordArguments, programMetadata, positionalArguments);
    this.keywordArgumentMap = new Map(
      keywordArguments.flatMap(argument =>
        argument.names.map(name => [name, argument])
      )
    );
  }

  generateHelpText() {
    let buffer = "";
    buffer += `Usage: ${path.basename(process.argv[1])}`;
    // TODO: Positional args
    buffer += '\n\n';
    for (const argument of this.keywordArguments) {
      buffer += `  ${argument.names.join(", ")}`;
    }
    return buffer;
  }

  exec(main: ProgramMain<T>, rawArgs?: string[]) {
    if (!rawArgs) {
      rawArgs = process.argv.slice(2);
    }
    let parseResult: ParseResult<T>;
    try {
      parseResult = this.parse(rawArgs);
    } catch (err) {
      console.error(`Error parsing commandline arguments: ${err.message}`);
      process.exit(1);
      throw new Error(); // TEMP: Isn't there supposed to be better handling for never-returning functions?
    }
    if (parseResult.resultType === "help") {
      const helpText = this.generateHelpText();
      console.log(helpText);
      process.exit(0); // TODO: Is this the right return code?
    } else {
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

  parse(rawArgs: string[]): ParseResult<T> {
    const argStack = rawArgs.slice();
    let currentParsedArgs: { [key: string]: any } = {};
    let currentArg: string | undefined;
    let unspecifiedRequiredArguments = this.keywordArguments.filter(
      argument => argument.metadata.required
    );
    while ((currentArg = argStack.shift())) {
      if (Program.helpArgumentsSet.has(currentArg)) {
        return { resultType: "help" };
      }
      const argument = this.keywordArgumentMap.get(currentArg);
      if (argument) {
        const argumentValue = argStack.shift();
        if (!argumentValue) {
          throw new ParseError(`Missing argument value`);
        }
        currentParsedArgs[argument.dest] = argument.convert(argumentValue);
        unspecifiedRequiredArguments = unspecifiedRequiredArguments.filter(
          a => argument !== a
        );
        continue;
      }
      throw new ParseError(`Unrecognized argument: ${currentArg}`);
    }
    if (unspecifiedRequiredArguments.length > 0) {
      throw new ParseError(`Missing required arguments`);
    }
    return {
      resultType: "arguments",
      parsedArgs: currentParsedArgs as any
    };
  }
}

export type Arguments<T> = T extends Program<infer U> ? U : never;
