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

export interface IKeywordArgumentCommonOptions<K extends string> {
  dest: K;
  description?: string;
  metavar?: string;
}

export interface IRequiredKeywordArgumentOptions<K extends string, V>
  extends IKeywordArgumentCommonOptions<K> {
  default?: undefined;
}

export interface IOptionalKeywordArgumentOptions<K extends string, V>
  extends IKeywordArgumentCommonOptions<K> {
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
