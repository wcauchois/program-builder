import ProgramBase, { IProgramBaseOptions } from "./ProgramBase";
import PositionalArgument from "./PositionalArgument";
import Program from "./Program";
import {
  KeywordArgumentOptions,
  IKeywordArgumentMetadata,
  IRequiredKeywordArgumentOptions,
  IOptionalKeywordArgumentOptions,
  IPositionalArgumentMetadata,
  Converter,
  IFlagOptions,
  IFlagMetadata
} from "./types";
import KeywordArgument from "./KeywordArgument";
import PositionalArguments from "./PositionalArguments";
import { convertString, convertInt, convertFloat } from "./converters";
import Flag from "./Flag";
import { Complete } from "./utils";

type ExtendProgramBuilderWithOptional<T, K extends string, U> = ProgramBuilder<
  T & { [P in K]?: U }
>;
type ExtendProgramBuilderWithRequired<T, K extends string, U> = ProgramBuilder<
  T & { [P in K]: U }
>;

type RemoveMethodFromProgramBuilder<T, K extends keyof ProgramBuilder<T>> = { [K in Exclude<keyof ProgramBuilder<T>, K>]:
  ProgramBuilder<T>[K] extends (...args: any) => ProgramBuilder<any> ? ReplaceReturnType<ProgramBuilder<T>[K], BuilderWithOptionalArg<T>> : ProgramBuilder<T>[K] };

/**
 * A program builder with an optional argument may no longer specify required positional arguments.
 * 
 * This type utility removes the "arg" method from ProgramBuilder to help enforce this invariant
 * at compile-time.
 */
type ProgramBuilderWithOptionalArg<T> = RemoveMethodFromProgramBuilder<T, 'arg'>;

export default class ProgramBuilder<T> extends ProgramBase {
  private constructor(options: IProgramBaseOptions) {
    super(options);
  }

  private keywordOptionsToMetadata(
    options: KeywordArgumentOptions<any, any>
  ): IKeywordArgumentMetadata {
    return {
      description: options.description,
      default: options.default,
      required: typeof options.default === 'undefined'
    };
  }

  private splitNames(names: string): string[] {
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
    dest: K,
    options: IPositionalArgumentMetadata = {}
  ): ExtendProgramBuilderWithRequired<T, K, string> {
    this.positionalArguments.push(new PositionalArgument(dest, options));
    return this as any;
  }

  optionalArg<K extends string>(
    dest: K,
    options: IPositionalArgumentMetadata = {}
  ): ProgramBuilderWithOptionalArg<ExtendProgramBuilderWithRequired<T, K, string>> {
    this.positionalArguments.pushOptional(new PositionalArgument(dest, options));
    return this as any;
  }

  customFlag<K extends string, V>(
    name: string,
    options: IOptionalKeywordArgumentOptions<K, V>,
    converter: Converter<V>
  ): ExtendProgramBuilderWithOptional<T, K, V>;

  customFlag<K extends string, V>(
    name: string,
    options: IRequiredKeywordArgumentOptions<K, V>,
    converter: Converter<V>
  ): ExtendProgramBuilderWithRequired<T, K, V>;

  customFlag<K extends string, V>(
    name: string,
    options: KeywordArgumentOptions<K, V>,
    converter: Converter<V>
  ): any {
    this.keywordArguments.push(new KeywordArgument(
      this.splitNames(name),
      options.dest,
      converter,
      this.keywordOptionsToMetadata(options)
    ));
    return this;
  }

  // #region Typed flags based on customFlag

  stringFlag<K extends string>(
    name: string,
    options: IOptionalKeywordArgumentOptions<K, string>
  ): ExtendProgramBuilderWithOptional<T, K, string>;

  stringFlag<K extends string>(
    name: string,
    options: IRequiredKeywordArgumentOptions<K, string>
  ): ExtendProgramBuilderWithRequired<T, K, string>;

  stringFlag<K extends string>(
    name: string,
    options: KeywordArgumentOptions<K, string>
  ): any {
    return this.customFlag<K, string>(name, options as any, convertString);
  }

  intFlag<K extends string>(
    name: string,
    options: IOptionalKeywordArgumentOptions<K, number>
  ): ExtendProgramBuilderWithOptional<T, K, number>;

  intFlag<K extends string>(
    name: string,
    options: IRequiredKeywordArgumentOptions<K, number>
  ): ExtendProgramBuilderWithRequired<T, K, number>;

  intFlag<K extends string>(
    name: string,
    options: KeywordArgumentOptions<K, number>
  ): any {
    return this.customFlag<K, number>(name, options as any, convertInt);
  }

  floatFlag<K extends string>(
    name: string,
    options: IOptionalKeywordArgumentOptions<K, number>
  ): ExtendProgramBuilderWithOptional<T, K, number>;

  floatFlag<K extends string>(
    name: string,
    options: IRequiredKeywordArgumentOptions<K, number>
  ): ExtendProgramBuilderWithRequired<T, K, number>;

  floatFlag<K extends string>(
    name: string,
    options: KeywordArgumentOptions<K, number>
  ): any {
    return this.customFlag<K, number>(name, options as any, convertFloat);
  }

  // #endregion

  flag<K extends string>(name: string, options: IFlagOptions<K>): ExtendProgramBuilderWithRequired<T, K, boolean> {
    const names = this.splitNames(name);
    const inverted = typeof options.inverted === 'boolean' ? options.inverted : names[0].startsWith('--no');
    const metadata: Complete<IFlagMetadata> = {
      description: options.description,
      metavar: options.metavar
    };
    this.flags.push(new Flag(
      options.dest,
      !inverted ? names : [],
      inverted ? [] : names,
      inverted,
      metadata
    ));
    return this as any;
  }

  build() {
    return new Program<T>(this);
  }

  static newBuilder(): ProgramBuilder<{}> {
    return new ProgramBuilder({
      flags: [],
      keywordArguments: [],
      positionalArguments: new PositionalArguments(),
      programMetadata: {}
    });
  }
}
