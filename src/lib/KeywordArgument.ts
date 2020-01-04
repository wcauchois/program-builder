import { IKeywordArgumentMetadata, Converter } from "./types";
import { isFlag } from "./utils";

export default class KeywordArgument {
  readonly names: string[];
  readonly dest: string;
  readonly metadata: IKeywordArgumentMetadata;
  readonly converter: Converter<any>;

  constructor(names: string[], dest: string, converter: Converter<any>, metadata: IKeywordArgumentMetadata) {
    const invalidNames = names.filter(name => !isFlag(name));
    if (invalidNames.length > 0) {
      // There might be a better place for this..
      console.error(`Error constructing program: Flag names must start with "-". Provided: ${invalidNames.join(', ')}`);
      process.exit(1);
    }

    this.names = names;
    this.dest = dest;
    this.converter = converter;
    this.metadata = metadata;
  }

  get firstName() {
    return this.names[0];
  }
}
