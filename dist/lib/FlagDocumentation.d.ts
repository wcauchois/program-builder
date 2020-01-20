import TableWriter from "./TableWriter";
/**
 * Encapsulates documentation about a {@link BooleanFlag} or {@link ValuedFlag}.
 */
export default class FlagDocumentation {
    readonly nameSpec: string;
    readonly description: string | undefined;
    constructor(nameSpec: string, description: string | undefined);
    /**
     * @internal
     */
    writeTo(tw: TableWriter): void;
}
