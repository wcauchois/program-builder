import {
  IValuedFlagMetadata,
  Converter,
  IAnyFlag
} from "./types";
import { isFlag } from "./utils";

export default class ValuedFlag implements IAnyFlag {
  readonly names: string[];
  readonly dest: string;
  readonly metadata: IValuedFlagMetadata;
  readonly converter: Converter<any>;
  readonly order: number;

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

  generateHelpColumns() {
    return [
      `${this.names.join(", ")} [${this.metadata.metavar || this.dest}]`,
      this.metadata.description
    ].filter(x => x) as string[];
  }
}
