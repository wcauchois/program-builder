import { IKeywordArgumentMetadata, Converter, IKeywordArgumentOrFlag } from "./types";
export default class KeywordArgument implements IKeywordArgumentOrFlag {
    readonly names: string[];
    readonly dest: string;
    readonly metadata: IKeywordArgumentMetadata;
    readonly converter: Converter<any>;
    readonly order: number;
    constructor(names: string[], dest: string, converter: Converter<any>, metadata: IKeywordArgumentMetadata, order: number);
    get firstName(): string;
    generateHelpColumns(): string[];
}
