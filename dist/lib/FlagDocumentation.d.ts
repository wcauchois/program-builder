import TableWriter from "./TableWriter";
export default class FlagDocumentation {
    readonly nameSpec: string;
    readonly description: string | undefined;
    constructor(nameSpec: string, description: string | undefined);
    writeTo(tw: TableWriter): void;
}
