/**
 * @internal
 */
export interface ITableWriterOptions {
    padding: number;
    maxColumnWidth: 60;
}
/**
 * @internal
 */
export default class TableWriter {
    private rows;
    private options;
    constructor(options?: Partial<ITableWriterOptions>);
    writeRow(row: string[]): void;
    toString(): string;
}
