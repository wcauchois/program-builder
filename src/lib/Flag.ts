import { IFlagMetadata } from "./types";

export default class Flag {
  readonly dest: string;
  readonly positiveNames: string[];
  readonly negativeNames: string[];
  readonly default: boolean;
  readonly metadata: IFlagMetadata;

  constructor(dest: string, positiveNames: string[], negativeNames: string[], theDefault: boolean, metadata: IFlagMetadata) {
    this.dest = dest;
    this.positiveNames = positiveNames;
    this.negativeNames = negativeNames;
    this.default = theDefault;
    this.metadata = metadata;
  }

  isPositiveName(name: string) {
    return this.positiveNames.includes(name);
  }

  get allNames() {
    return this.positiveNames.concat(this.negativeNames);
  }
}
