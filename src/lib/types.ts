interface IKeywordArgumentMetadata {
  required: boolean;
  description?: string;
}

interface IKeywordArgument {
  readonly dest: string;

  /**
   * Names for this argument including short names (i.e. `-s`, `--string`).
   */
  readonly names: string[];

  readonly metadata: IKeywordArgumentMetadata;

  convert(inputString: string): any;
}

interface IFlag {
  readonly dest: string;

  readonly positiveNames: string[];

  readonly negativeNames: string[];
}

interface IKeywordArgumentCommonOptions<K extends string> {
  dest: K;
  description?: string;
}

interface IRequiredKeywordArgumentOptions<K extends string>
  extends IKeywordArgumentCommonOptions<K> {
  required: true;
}

interface IOptionalKeywordArgumentOptions<K extends string>
  extends IKeywordArgumentCommonOptions<K> {
  required?: false;
}

type KeywordArgumentOptions<K extends string> =
  | IRequiredKeywordArgumentOptions<K>
  | IOptionalKeywordArgumentOptions<K>;

interface IProgramMetadata {
  description?: string;
}
