import { IPositionalArgumentMetadata } from "./types";

export default class PositionalArgument {
  readonly dest: string;
  readonly metadata: IPositionalArgumentMetadata;

  constructor(dest: string, metadata: IPositionalArgumentMetadata) {
    this.dest = dest;
    this.metadata = metadata;
  }
}
