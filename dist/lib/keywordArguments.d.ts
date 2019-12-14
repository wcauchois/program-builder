declare abstract class BaseKeywordArgument implements IKeywordArgument {
    readonly dest: string;
    readonly names: string[];
    readonly metadata: IKeywordArgumentMetadata;
    constructor(dest: string, names: string[] | string, metadata: IKeywordArgumentMetadata);
    convert(inputString: string): any;
}
export declare class StringKeywordArgument extends BaseKeywordArgument {
}
export declare class IntKeywordArgument extends BaseKeywordArgument {
    convert(inputString: string): any;
}
export declare class FloatKeywordArgument extends BaseKeywordArgument {
    convert(inputString: string): any;
}
export {};
