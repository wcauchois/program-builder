import FlagDocumentation from "./FlagDocumentation";

export interface IValuedFlagMetadata {
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
 * Common options for a valued flag.
 */
export interface IValuedFlagCommonOptions<K extends string> {
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
   * to {@link IValuedFlagCommonOptions.dest}.
   */
  metavar?: string;
}

export interface IRequiredValuedFlagOptions<K extends string, V>
  extends IValuedFlagCommonOptions<K> {
  default?: undefined;
}

/**
 * Extend {@link IValuedFlagCommonOptions} with the default value
 * for a flag.
 */
export interface IOptionalValuedFlagOptions<K extends string, V>
  extends IValuedFlagCommonOptions<K> {
  /**
   * The default value for the flag.
   */
  default: V;
}

export type ValuedFlagOptions<K extends string, V> =
  | IRequiredValuedFlagOptions<K, V>
  | IOptionalValuedFlagOptions<K, V>;

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

export interface IAnyFlag {
  getDocumentation(): FlagDocumentation;
}

export type ProgramMain<T> = ((args: T) => Promise<void>) | ((args: T) => void);
