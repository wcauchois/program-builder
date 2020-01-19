import TableWriter from "./TableWriter";

export default class FlagDocumentation {
  readonly nameSpec: string;
  readonly description: string | undefined;

  constructor(nameSpec: string, description: string | undefined) {
    this.nameSpec = nameSpec;
    this.description = description;
  }

  writeTo(tw: TableWriter) {
    tw.writeRow([this.nameSpec, this.description || ""]);
  }
}
