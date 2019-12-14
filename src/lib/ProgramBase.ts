import PositionalArgument from "./PositionalArgument";
import { IKeywordArgument, IProgramMetadata } from "./types";

export default abstract class ProgramBase {
  protected readonly keywordArguments: IKeywordArgument[];
  protected readonly programMetadata: IProgramMetadata;
  protected readonly positionalArguments: PositionalArgument[];

  constructor(
    keywordArguments: IKeywordArgument[],
    programMetadata: IProgramMetadata,
    positionalArguments: PositionalArgument[]
  ) {
    this.keywordArguments = keywordArguments;
    this.programMetadata = programMetadata;
    this.positionalArguments = positionalArguments;
  }
}
