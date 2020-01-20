import ProgramBase from "./ProgramBase";
import Program from "./Program";
import { IRequiredValuedFlagOptions, IOptionalValuedFlagOptions, IPositionalArgumentMetadata, Converter, IBooleanFlagOptions, ProgramMain } from "./types";
import ProgramWithAction from "./ProgramWithAction";
import ProgramWithSubcommands, { ProgramSubcommandMap } from "./ProgramWithSubcommands";
export declare type ExtendProgramBuilderWithOptional<T, K extends string, U> = ProgramBuilder<T & {
    [P in K]?: U;
}>;
export declare type ExtendProgramBuilderWithRequired<T, K extends string, U> = ProgramBuilder<T & {
    [P in K]: U;
}>;
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
    private flagNumber;
    private constructor();
    private keywordOptionsToMetadata;
    private splitNames;
    /**
     * Set the program description.
     *
     * @param newDescription - The new description for the program.
     */
    description(newDescription: string): this;
    /**
     * Add a positional argument to the program.
     *
     * @param dest - The destination key into which the argument value will be stored.
     * @param options - See {@link IPositionalArgumentMetadata}.
     *
     * @remarks
     * The order in which you call `arg` on a ProgramBuilder matters.
     */
    arg<K extends string>(dest: K, options?: IPositionalArgumentMetadata): ExtendProgramBuilderWithRequired<T, K, string>;
    /**
     * Add an optional positional argument to the program.
     *
     * @param dest - The destination key into which the argument value will be stored.
     * @param options - See {@link IPositionalArgumentMetadata}.
     */
    optionalArg<K extends string>(dest: K, options?: IPositionalArgumentMetadata): ExtendProgramBuilderWithOptional<T, K, string>;
    customFlag<K extends string, V>(name: string, options: IOptionalValuedFlagOptions<K, V>, converter: Converter<V>): ExtendProgramBuilderWithOptional<T, K, V>;
    customFlag<K extends string, V>(name: string, options: IRequiredValuedFlagOptions<K, V>, converter: Converter<V>): ExtendProgramBuilderWithRequired<T, K, V>;
    /**
     * Add an optional valued flag to the program.
     *
     * @param name - The name for the flag, including leading dashes. Multiple alternative
     * names may be specified by separating them within the string by commas. For example,
     * `"-i,--input"`.
     * @param options - See {@link IOptionalValuedFlagOptions}.
     */
    stringFlag<K extends string>(name: string, options: IOptionalValuedFlagOptions<K, string>): ExtendProgramBuilderWithOptional<T, K, string>;
    /**
     * Add a required valued flag to the program.
     *
     * @param name - The name for the flag, including leading dashes. Multiple alternative
     * names may be specified by separating them within the string by commas. For example,
     * `"-i,--input"`.
     * @param options - See {@link IRequiredValuedFlagOptions}.
     */
    stringFlag<K extends string>(name: string, options: IRequiredValuedFlagOptions<K, string>): ExtendProgramBuilderWithRequired<T, K, string>;
    /**
     * {@inheritdoc ProgramBuilder.(stringFlag:1)}
     */
    intFlag<K extends string>(name: string, options: IOptionalValuedFlagOptions<K, number>): ExtendProgramBuilderWithOptional<T, K, number>;
    /**
     * {@inheritdoc ProgramBuilder.(stringFlag:2)}
     */
    intFlag<K extends string>(name: string, options: IRequiredValuedFlagOptions<K, number>): ExtendProgramBuilderWithRequired<T, K, number>;
    /**
     * {@inheritdoc ProgramBuilder.(stringFlag:1)}
     */
    floatFlag<K extends string>(name: string, options: IOptionalValuedFlagOptions<K, number>): ExtendProgramBuilderWithOptional<T, K, number>;
    /**
     * {@inheritdoc ProgramBuilder.(stringFlag:2)}
     */
    floatFlag<K extends string>(name: string, options: IRequiredValuedFlagOptions<K, number>): ExtendProgramBuilderWithRequired<T, K, number>;
    /**
     * Add a boolean-valued flag to the program (sometimes known as a "switch").
     *
     * @param name - The name for the flag, including leading dashes. Multiple alternative
     * names may be specified by separating them within the string by commas. For example,
     * `"-i,--input"`.
     * @param options - See {@link IFlagOptions}.
     */
    flag<K extends string>(name: string, options: IBooleanFlagOptions<K>): ExtendProgramBuilderWithRequired<T, K, boolean>;
    apply<U extends T>(fn: (builder: ProgramBuilder<T>) => ProgramBuilder<U>): ProgramBuilder<U>;
    /**
     * Build and return a {@link Program}.
     */
    build(): Program<T>;
    /**
     * Bind the ProgramBuilder to an action and return a {@link ProgramWithAction}
     * suitable for use constructing subcommands.
     */
    bind(action: ProgramMain<T>): ProgramWithAction<T>;
    /**
     * Build a {@link ProgramWithSubcommands} using a map of {@link ProgramWithAction}s.
     */
    static buildWithSubcommands(subcommandMap: ProgramSubcommandMap): ProgramWithSubcommands;
    /**
     * Create a new ProgramBuilder instance.
     */
    static newBuilder(): ProgramBuilder<{}>;
}
