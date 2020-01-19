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
 * Create a new ProgramBuilder with {@link ProgramBuilder.newBuilder}.
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

  arg<K extends string>(
    dest: K,
    options: IPositionalArgumentMetadata = {}
  ): ExtendProgramBuilderWithRequired<T, K, string> {
    this.positionalArguments.push(new PositionalArgument(dest, options));
    return this as any;
  }

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

  stringFlag<K extends string>(
    name: string,
    options: IOptionalValuedFlagOptions<K, string>
  ): ExtendProgramBuilderWithOptional<T, K, string>;

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

  intFlag<K extends string>(
    name: string,
    options: IOptionalValuedFlagOptions<K, number>
  ): ExtendProgramBuilderWithOptional<T, K, number>;

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
   * Add an optional float-valued flag to the program.
   *
   * @param name - The name for the flag, including leading dashes. Multiple alternative
   * names may be specified by separating them within the string by commas. For example,
   * "-i,--input".
   * @param options - See {@link IOptionalValuedFlagOptions}
   */
  floatFlag<K extends string>(
    name: string,
    options: IOptionalValuedFlagOptions<K, number>
  ): ExtendProgramBuilderWithOptional<T, K, number>;

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

  build() {
    return new Program<T>(this);
  }

  bind(action: ProgramMain<T>) {
    return new ProgramWithAction<T>(this, action);
  }

  static newBuilder(): ProgramBuilder<{}> {
    return new ProgramBuilder({
      flags: [],
      valuedFlags: [],
      positionalArguments: new PositionalArguments(),
      programMetadata: {}
    });
  }
}
