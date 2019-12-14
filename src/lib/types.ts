export interface IKeywordArgumentMetadata {
  required: boolean;
  description?: string;
}

export interface IKeywordArgument {
  readonly dest: string;

  /**
   * Names for this argument including short names (i.e. `-s`, `--string`).
   */
  readonly names: string[];

  readonly metadata: IKeywordArgumentMetadata;

  convert(inputString: string): any;
}

export interface IFlag {
  readonly dest: string;

  readonly positiveNames: string[];

  readonly negativeNames: string[];
}

export interface IKeywordArgumentCommonOptions<K extends string> {
  dest: K;
  description?: string;
}

export interface IRequiredKeywordArgumentOptions<K extends string>
  extends IKeywordArgumentCommonOptions<K> {
  required: true;
}

export interface IOptionalKeywordArgumentOptions<K extends string>
  extends IKeywordArgumentCommonOptions<K> {
  required?: false;
}

export type KeywordArgumentOptions<K extends string> =
  | IRequiredKeywordArgumentOptions<K>
  | IOptionalKeywordArgumentOptions<K>;

export interface IProgramMetadata {
  description?: string;
}
