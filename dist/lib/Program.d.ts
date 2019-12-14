import PositionalArgument from './PositionalArgument';
import ProgramBase from './ProgramBase';
interface IParseHelpResult {
    resultType: "help";
}
interface IParseArgumentsResult<T> {
    resultType: "arguments";
    parsedArgs: T;
}
declare type ParseResult<T> = IParseHelpResult | IParseArgumentsResult<T>;
declare type ProgramMain<T> = ((args: T) => Promise<void>) | ((args: T) => void);
export default class Program<T> extends ProgramBase {
    private readonly keywordArgumentMap;
    static readonly helpArgumentsSet: Set<string>;
    constructor(keywordArguments: IKeywordArgument[], programMetadata: IProgramMetadata, positionalArguments: PositionalArgument[]);
    generateHelpText(): string;
    exec(main: ProgramMain<T>, rawArgs?: string[]): void;
    parse(rawArgs: string[]): ParseResult<T>;
}
export {};
