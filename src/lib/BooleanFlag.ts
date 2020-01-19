import { IBooleanFlagMetadata, IAnyFlag } from "./types";
import FlagDocumentation from "./FlagDocumentation";

export default class BooleanFlag implements IAnyFlag {
  readonly dest: string;
  readonly positiveNames: string[];
  readonly negativeNames: string[];
  readonly default: boolean;
  readonly metadata: IBooleanFlagMetadata;
  readonly order: number;

  constructor(
    dest: string,
    positiveNames: string[],
    negativeNames: string[],
    theDefault: boolean,
    metadata: IBooleanFlagMetadata,
    order: number
  ) {
    this.dest = dest;
    this.positiveNames = positiveNames;
    this.negativeNames = negativeNames;
    this.default = theDefault;
    this.metadata = metadata;
    this.order = order;
  }

  isPositiveName(name: string) {
    return this.positiveNames.includes(name);
  }

  get allNames() {
    return this.positiveNames.concat(this.negativeNames);
  }

  getDocumentation() {
    const nameSpec = this.allNames.join(", ");
    return new FlagDocumentation(nameSpec, this.metadata.description);
  }
}
