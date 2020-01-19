import ProgramBase, { IProgramBaseOptions } from "./ProgramBase";
import PositionalArgument from "./PositionalArgument";
import Program from "./Program";
import {
  ValuedFlagOptions,
  IValuedFlagMetadata,
  IRequiredValuedFlagOptions,
  IOptionalValuedFlagOptions,
  IPositionalArgumentMetadata,
  Converter,
  IFlagOptions,
  IFlagMetadata,
  ProgramMain
} from "./types";
import ValuedFlag from "./ValuedFlag";
import PositionalArguments from "./PositionalArguments";
import { convertString, convertInt, convertFloat } from "./converters";
import Flag from "./Flag";
import { Complete } from "./utils";
import ProgramWithAction from "./ProgramWithAction";
import ProgramWithSubcommands, { ProgramSubcommandMap } from "./ProgramWithSubcommands";

export type ExtendProgramBuilderWithOptional<
  T,
  K extends string,
  U
> = ProgramBuilder<T & { [P in K]?: U }>;

export type ExtendProgramBuilderWithRequired<
  T,
  K extends string,
  U
> = ProgramBuilder<T & { [P in K]: U }>;

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
export default class ProgramBuilder<T> extends ProgramBase {
  private flagNumber: number;

  private constructor(options: IProgramBaseOptions) {
    super(options);
    this.flagNumber = 0;
  }

  private keywordOptionsToMetadata(
    options: ValuedFlagOptions<any, any>
  ): Complete<IValuedFlagMetadata> {
    return {
      description: options.description,
      default: options.default,
      required: typeof options.default === "undefined",
      metavar: options.metavar
    };
  }

  private splitNames(names: string): string[] {
    return names.split(",").map(x => x.trim());
  }

  /**
   * Set the program description.
   *
   * @param newDescription - The new description for the program.
   */
  description(newDescription: string) {
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
  arg<K extends string>(
    dest: K,
    options: IPositionalArgumentMetadata = {}
  ): ExtendProgramBuilderWithRequired<T, K, string> {
    this.positionalArguments.push(new PositionalArgument(dest, options));
    return this as any;
  }

  /**
   * Add an optional positional argument to the program.
   * 
   * @param dest - The destination key into which the argument value will be stored.
   * @param options - See {@link IPositionalArgumentMetadata}.
   */
  optionalArg<K extends string>(
    dest: K,
    options: IPositionalArgumentMetadata = {}
  ): ExtendProgramBuilderWithOptional<T, K, string> {
    this.positionalArguments.pushOptional(
      new PositionalArgument(dest, options)
    );
    return this as any;
  }

  customFlag<K extends string, V>(
    name: string,
    options: IOptionalValuedFlagOptions<K, V>,
    converter: Converter<V>
  ): ExtendProgramBuilderWithOptional<T, K, V>;

  customFlag<K extends string, V>(
    name: string,
    options: IRequiredValuedFlagOptions<K, V>,
    converter: Converter<V>
  ): ExtendProgramBuilderWithRequired<T, K, V>;

  customFlag<K extends string, V>(
    name: string,
    options: ValuedFlagOptions<K, V>,
    converter: Converter<V>
  ): any {
    this.valuedFlags.push(
      new ValuedFlag(
        this.splitNames(name),
        options.dest,
        converter,
        this.keywordOptionsToMetadata(options),
        ++this.flagNumber
      )
    );
    return this;
  }

  // #region Typed flags based on customFlag

  /**
   * Add an optional valued flag to the program.
   *
   * @param name - The name for the flag, including leading dashes. Multiple alternative
   * names may be specified by separating them within the string by commas. For example,
   * `"-i,--input"`.
   * @param options - See {@link IOptionalValuedFlagOptions}.
   */
  stringFlag<K extends string>(
    name: string,
    options: IOptionalValuedFlagOptions<K, string>
  ): ExtendProgramBuilderWithOptional<T, K, string>;

  /**
   * Add a required valued flag to the program.
   *
   * @param name - The name for the flag, including leading dashes. Multiple alternative
   * names may be specified by separating them within the string by commas. For example,
   * `"-i,--input"`.
   * @param options - See {@link IRequiredValuedFlagOptions}.
   */
  stringFlag<K extends string>(
    name: string,
    options: IRequiredValuedFlagOptions<K, string>
  ): ExtendProgramBuilderWithRequired<T, K, string>;

  stringFlag<K extends string>(
    name: string,
    options: ValuedFlagOptions<K, string>
  ): any {
    return this.customFlag<K, string>(name, options as any, convertString);
  }

  /**
   * {@inheritdoc ProgramBuilder.(stringFlag:1)}
   */
  intFlag<K extends string>(
    name: string,
    options: IOptionalValuedFlagOptions<K, number>
  ): ExtendProgramBuilderWithOptional<T, K, number>;

  /**
   * {@inheritdoc ProgramBuilder.(stringFlag:2)}
   */
  intFlag<K extends string>(
    name: string,
    options: IRequiredValuedFlagOptions<K, number>
  ): ExtendProgramBuilderWithRequired<T, K, number>;

  intFlag<K extends string>(
    name: string,
    options: ValuedFlagOptions<K, number>
  ): any {
    return this.customFlag<K, number>(name, options as any, convertInt);
  }

  /**
   * {@inheritdoc ProgramBuilder.(stringFlag:1)}
   */
  floatFlag<K extends string>(
    name: string,
    options: IOptionalValuedFlagOptions<K, number>
  ): ExtendProgramBuilderWithOptional<T, K, number>;

  /**
   * {@inheritdoc ProgramBuilder.(stringFlag:2)}
   */
  floatFlag<K extends string>(
    name: string,
    options: IRequiredValuedFlagOptions<K, number>
  ): ExtendProgramBuilderWithRequired<T, K, number>;

  floatFlag<K extends string>(
    name: string,
    options: ValuedFlagOptions<K, number>
  ): any {
    return this.customFlag<K, number>(name, options as any, convertFloat);
  }

  // #endregion

  /**
   * Add a boolean-valued flag to the program (sometimes known as a "switch").
   *
   * @param name - The name for the flag, including leading dashes. Multiple alternative
   * names may be specified by separating them within the string by commas. For example,
   * `"-i,--input"`.
   * @param options - See {@link IFlagOptions}.
   */
  flag<K extends string>(
    name: string,
    options: IFlagOptions<K>
  ): ExtendProgramBuilderWithRequired<T, K, boolean> {
    const names = this.splitNames(name);
    const inverted =
      typeof options.inverted === "boolean"
        ? options.inverted
        : names[0].startsWith("--no");
    const metadata: Complete<IFlagMetadata> = {
      description: options.description,
      metavar: options.metavar
    };
    this.flags.push(
      new Flag(
        options.dest,
        !inverted ? names : [],
        inverted ? [] : names,
        inverted,
        metadata,
        ++this.flagNumber
      )
    );
    return this as any;
  }

  /**
   * Build and return a {@link Program}.
   */
  build() {
    return new Program<T>(this);
  }

  /**
   * Bind the ProgramBuilder to an action and return a {@link ProgramWithAction}
   * suitable for use constructing subcommands.
   */
  bind(action: ProgramMain<T>) {
    return new ProgramWithAction<T>(this, action);
  }

  /**
   * Build a {@link ProgramWithSubcommands} using a map of {@link ProgramWithAction}s.
   */
  static buildWithSubcommands(subcommandMap: ProgramSubcommandMap) {
    return new ProgramWithSubcommands(subcommandMap);
  }

  /**
   * Create a new ProgramBuilder instance.
   */
  static newBuilder(): ProgramBuilder<{}> {
    return new ProgramBuilder({
      flags: [],
      valuedFlags: [],
      positionalArguments: new PositionalArguments(),
      programMetadata: {}
    });
  }
}
