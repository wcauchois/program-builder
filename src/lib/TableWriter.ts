import { rightPad } from "./utils";
import wrap = require("word-wrap");

export interface ITableWriterOptions {
  padding: number;
  maxColumnWidth: 60;
}

const defaultOptions: ITableWriterOptions = {
  padding: 2,
  maxColumnWidth: 60
};

export default class TableWriter {
  private rows: string[][];
  private options: ITableWriterOptions;

  constructor(options: Partial<ITableWriterOptions> = {}) {
    this.rows = [];
    this.options = {
      ...defaultOptions,
      ...options
    };
  }

  writeRow(row: string[]) {
    this.rows.push(row);
  }

  toString(): string {
    const { padding, maxColumnWidth } = this.options;

    const wrappedRows: string[][] = [];
    for (const row of this.rows) {
      const wrappedColumnLines = row.map(col =>
        wrap(col, { width: maxColumnWidth, indent: "", trim: true }).split("\n")
      );
      const maxLines = Math.max(
        ...wrappedColumnLines.map(lines => lines.length)
      );
      const newRows: string[][] = Array(maxLines)
        .fill(undefined)
        .map(() =>
          Array(row.length)
            .fill(undefined)
            .map(() => "")
        );
      for (let i = 0; i < wrappedColumnLines.length; i++) {
        for (let j = 0; j < wrappedColumnLines[i].length; j++) {
          newRows[j][i] = wrappedColumnLines[i][j];
        }
      }
      wrappedRows.push(...newRows);
    }

    const maxColumnLengths = new Map<number, number>();
    for (const row of wrappedRows) {
      for (let colNum = 0; colNum < row.length; colNum++) {
        maxColumnLengths.set(
          colNum,
          Math.max(maxColumnLengths.get(colNum) || 0, row[colNum].length)
        );
      }
    }
    const lines = [];
    for (const row of wrappedRows) {
      const paddedCols = row.map((col, i) =>
        i !== row.length - 1
          ? rightPad(col, (maxColumnLengths.get(i) || 0) + padding)
          : col
      );
      lines.push(rightPad("", padding) + paddedCols.join(""));
    }
    return lines.join("\n");
  }
}
