import { IPositionalArgumentMetadata } from "./types";
import TableWriter from "./TableWriter";
export default class PositionalArgument {
    readonly dest: string;
    readonly metadata: IPositionalArgumentMetadata;
    readonly required: boolean;
    constructor(dest: string, metadata: IPositionalArgumentMetadata, required: boolean);
    get destOrMetavar(): string;
    get description(): string | undefined;
    /**
     * @internal
     */
    writeDocumentationTo(tw: TableWriter): void;
}
