import ProgramBase from "./ProgramBase";
import PositionalArgument from "./PositionalArgument";
import {
  StringKeywordArgument,
  IntKeywordArgument,
  FloatKeywordArgument
} from "./keywordArguments";
import Program from "./Program";
import {
  IKeywordArgument,
  IProgramMetadata,
  KeywordArgumentOptions,
  IKeywordArgumentMetadata,
  IRequiredKeywordArgumentOptions,
  IOptionalKeywordArgumentOptions
} from "./types";

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

  private withKeywordArgument(argument: IKeywordArgument) {
    this.keywordArguments.push(argument);
    return this as any;
  }

  private optionsToMetadata(
    options: KeywordArgumentOptions<any>
  ): IKeywordArgumentMetadata {
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
    this.positionalArguments.push(
      new PositionalArgument(dest, this.currentArgumentPosition, true)
    );
    this.currentArgumentPosition++;
    return this as any;
  }

  optionalArg<K extends string>(
    dest: K
  ): ExtendProgramBuilderWithOptional<T, K, string> {
    this.positionalArguments.push(
      new PositionalArgument(dest, this.currentArgumentPosition, false)
    );
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

  stringArg<K extends string>(
    names: string,
    options: KeywordArgumentOptions<K>
  ) {
    return this.withKeywordArgument(
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
    return this.withKeywordArgument(
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

  floatArg<K extends string>(
    names: string,
    options: KeywordArgumentOptions<K>
  ) {
    return this.withKeywordArgument(
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
    return new Program<T>(
      this.keywordArguments,
      this.programMetadata,
      this.positionalArguments
    );
  }

  static newProgram(): ProgramBuilder<{}> {
    return new ProgramBuilder([], {}, []);
  }
}
