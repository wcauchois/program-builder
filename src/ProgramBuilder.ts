
interface IArgumentMetadata {
  required: boolean;
  description?: string;
}

class ArgumentError extends Error {}

interface IArgument {
  readonly dest: string;

  /**
   * Names for this argument including short names (i.e. `-s`, `--string`).
   */
  readonly names: string[];

  readonly metadata: IArgumentMetadata;

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

abstract class BaseArgument implements IArgument {
  readonly dest: string;
  readonly names: string[];
  readonly metadata: IArgumentMetadata;

  constructor(dest: string, names: string[] | string, metadata: IArgumentMetadata) {
    this.dest = dest;
    this.names = Array.isArray(names) ? names : [names];
    this.metadata = metadata;
  }

  convert(inputString: string): any {
    return inputString;
  }
}

class StringArgument extends BaseArgument {}

class IntArgument extends BaseArgument {
  convert(inputString: string): any {
    if (!validInt(inputString)) {
      throw new ArgumentError('TODO');
    }
    return parseInt(inputString, 10);
  }
}

class FloatArgument extends BaseArgument {
  convert(inputString: string): any {
    if (!validFloat(inputString)) {
      throw new ArgumentError('TODO');
    }
    return parseFloat(inputString);
  }
}

interface IArgumentCommonOptions<K extends string> {
  dest: K;
  description?: string;
}

interface IRequiredArgumentOptions<K extends string> extends IArgumentCommonOptions<K> {
  required: true;
}

interface IOptionalArgumentOptions<K extends string> extends IArgumentCommonOptions<K> {
  required?: false;
}

type ArgumentOptions<K extends string> = IRequiredArgumentOptions<K> | IOptionalArgumentOptions<K>;

interface IProgramMetadata {
  description?: string;
}

abstract class ProgramBase {
  protected readonly argumentRegistry: IArgument[];
  protected readonly programMetadata: IProgramMetadata;

  constructor(argumentRegistry: IArgument[], programMetadata: IProgramMetadata) {
    this.argumentRegistry = argumentRegistry;
    this.programMetadata = programMetadata;
  }
}

type ExtendProgramBuilderWithOptional<T, K extends string, U> = ProgramBuilder<T & { [P in K]?: U }>;
type ExtendProgramBuilderWithRequired<T, K extends string, U> = ProgramBuilder<T & { [P in K]: U }>;

export default class ProgramBuilder<T> extends ProgramBase {
  private constructor(argumentRegistry: IArgument[], programMetadata: IProgramMetadata) {
    super(argumentRegistry, programMetadata);
  }

  private withArgument(argument: IArgument) {
    this.argumentRegistry.push(argument);
    return this as any;
  }

  private optionsToMetadata(options: ArgumentOptions<any>): IArgumentMetadata {
    return {
      description: options.description,
      required: !!options.required
    };
  }

  private convertNames(names: string): string[] {
    return names.split(',').map(x => x.trim());
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

  stringArg<K extends string>(names: string, options: IRequiredArgumentOptions<K>): ExtendProgramBuilderWithRequired<T, K, string>;

  stringArg<K extends string>(names: string, options: IOptionalArgumentOptions<K>): ExtendProgramBuilderWithOptional<T, K, string>;

  stringArg<K extends string>(names: string, options: ArgumentOptions<K>) {
    return this.withArgument(new StringArgument(options.dest, this.convertNames(names), this.optionsToMetadata(options)));
  }

  intArg<K extends string>(names: string, options: IRequiredArgumentOptions<K>): ExtendProgramBuilderWithRequired<T, K, number>;

  intArg<K extends string>(names: string, options: IOptionalArgumentOptions<K>): ExtendProgramBuilderWithOptional<T, K, number>;

  intArg<K extends string>(names: string, options: ArgumentOptions<K>) {
    return this.withArgument(new IntArgument(options.dest, this.convertNames(names), this.optionsToMetadata(options)));
  }

  floatArg<K extends string>(names: string, options: IRequiredArgumentOptions<K>): ExtendProgramBuilderWithRequired<T, K, number>;

  floatArg<K extends string>(names: string, options: IOptionalArgumentOptions<K>): ExtendProgramBuilderWithOptional<T, K, number>;

  floatArg<K extends string>(names: string, options: ArgumentOptions<K>) {
    return this.withArgument(new FloatArgument(options.dest, this.convertNames(names), this.optionsToMetadata(options)));
  }

  flag(name: string) {
    // TODO
  }

  build() {
    return new Program<T>(this.argumentRegistry, this.programMetadata);
  }

  static newProgram(): ProgramBuilder<{}> {
    return new ProgramBuilder([], {});
  }
}

class ParseError extends Error {}

interface IParseHelpResult {
  resultType: 'help';
}

interface IParseArgumentsResult<T> {
  resultType: 'arguments';
  parsedArgs: T;
}

type ParseResult<T> = IParseHelpResult | IParseArgumentsResult<T>;

type ProgramMain<T> = ((args: T) => Promise<void>) | ((args: T) => void);

class Program<T> extends ProgramBase {
  private readonly argumentMap: Map<string, IArgument>;

  static readonly helpArgumentsSet = new Set(['-h', '--help']);

  constructor(argumentRegistry: IArgument[], programMetadata: IProgramMetadata) {
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
    if (parseResult.resultType === 'help') {
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
        currentParsedArgs[argument.dest] = argument.convert(argumentValue);
        unspecifiedRequiredArguments = unspecifiedRequiredArguments.filter(a => argument !== a);
        continue;
      }
      throw new ParseError(`Unrecognized argument: ${currentArg}`);
    }
    if (unspecifiedRequiredArguments.length > 0) {
      throw new ParseError(`Missing required arguments`);
    }
    return {
      resultType: 'arguments',
      parsedArgs: currentParsedArgs as any
    };
  }
}

export type Arguments<T> = T extends Program<infer U> ? U : never;
