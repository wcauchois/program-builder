export interface IKeywordArgumentMetadata {
  default?: any;
  description?: string;
  metavar?: string;
  required: boolean;
}

export interface IFlagMetadata {
  description?: string;
  metavar?: string;
}

export interface IPositionalArgumentMetadata {
  description?: string;
  metavar?: string;
}

/**
 * Common options for a flag with a value.
 */
export interface IKeywordArgumentCommonOptions<K extends string> {
  /**
   * The destination key in the final arguments object into which this
   * argument's value will be stored.
   */
  dest: K;

  /**
   * A description for the flag used in help text generation.
   */
  description?: string;

  /**
   * A metavariable for the flag used in help text generation. Defaults
   * to {@link IKeywordArgumentCommonOptions.dest}.
   */
  metavar?: string;
}

export interface IRequiredKeywordArgumentOptions<K extends string, V>
  extends IKeywordArgumentCommonOptions<K> {
  default?: undefined;
}

/**
 * Extend {@link IKeywordArgumentCommonOptions} with the default value
 * for a flag.
 */
export interface IOptionalKeywordArgumentOptions<K extends string, V>
  extends IKeywordArgumentCommonOptions<K> {

  /**
   * The default value for the flag.
   */
  default: V;
}

export type KeywordArgumentOptions<K extends string, V> =
  | IRequiredKeywordArgumentOptions<K, V>
  | IOptionalKeywordArgumentOptions<K, V>;

export interface IProgramMetadata {
  description?: string;
}

export interface IFlagOptions<K extends string> {
  dest: K;
  description?: string;
  metavar?: string;
  inverted?: boolean;
}

export type Converter<V> = (input: string, argName: string) => V;

export interface IKeywordArgumentOrFlag {
  generateHelpColumns(): string[];
}

export type ProgramMain<T> = ((args: T) => Promise<void>) | ((args: T) => void);
