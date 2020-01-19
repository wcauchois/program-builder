import TableWriter from "./TableWriter";

/**
 * Encapsulates documentation about a {@link Flag} or {@link ValuedFlag}.
 */
export default class FlagDocumentation {
  readonly nameSpec: string;
  readonly description: string | undefined;

  constructor(nameSpec: string, description: string | undefined) {
    this.nameSpec = nameSpec;
    this.description = description;
  }

  /**
   * @internal
   */
  writeTo(tw: TableWriter) {
    tw.writeRow([this.nameSpec, this.description || ""]);
  }
}
