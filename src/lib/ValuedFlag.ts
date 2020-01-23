import { IValuedFlagMetadata, Converter, IAnyFlag } from "./types";
import { isFlag, getSurroundingChars } from "./utils";
import FlagDocumentation from "./FlagDocumentation";

export default class ValuedFlag implements IAnyFlag {
  readonly names: string[];
  readonly dest: string;
  readonly metadata: IValuedFlagMetadata;
  readonly converter: Converter<any>;
  readonly order: number;

  get default() {
    return this.metadata.default;
  }

  get required() {
    return this.metadata.required;
  }

  constructor(
    names: string[],
    dest: string,
    converter: Converter<any>,
    metadata: IValuedFlagMetadata,
    order: number
  ) {
    const invalidNames = names.filter(name => !isFlag(name));
    if (invalidNames.length > 0) {
      // There might be a better place for this..
      console.error(
        `Error constructing program: Flag names must start with "-". Provided: ${invalidNames.join(
          ", "
        )}`
      );
      process.exit(1);
    }

    this.names = names;
    this.dest = dest;
    this.converter = converter;
    this.metadata = metadata;
    this.order = order;
  }

  get firstName() {
    return this.names[0];
  }

  getDocumentation() {
    const [lchar, rchar] = getSurroundingChars(this.required);
    const nameSpec = `${this.names.join(", ")} ${lchar}${this.metadata
      .metavar || this.dest}${rchar}`;
    return new FlagDocumentation(nameSpec, this.metadata.description);
  }
}
