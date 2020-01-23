import { IPositionalArgumentMetadata } from "./types";
import TableWriter from "./TableWriter";
import { getSurroundingChars } from "./utils";

export default class PositionalArgument {
  readonly dest: string;
  readonly metadata: IPositionalArgumentMetadata;
  readonly required: boolean;

  constructor(
    dest: string,
    metadata: IPositionalArgumentMetadata,
    required: boolean
  ) {
    this.dest = dest;
    this.metadata = metadata;
    this.required = required;
  }

  get destOrMetavar() {
    return this.dest ?? this.metadata.metavar;
  }

  get description() {
    return this.metadata.description;
  }

  /**
   * @internal
   */
  writeDocumentationTo(tw: TableWriter) {
    tw.writeRow([
      `${this.metadata.metavar || this.dest}`,
      (this.description || "") + (this.required ? "" : " (optional)")
    ]);
  }
}
