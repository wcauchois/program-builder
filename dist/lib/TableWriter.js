"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const wrap = require("word-wrap");
const defaultOptions = {
    padding: 2,
    maxColumnWidth: 60
};
/**
 * @internal
 */
class TableWriter {
    constructor(options = {}) {
        this.rows = [];
        this.options = {
            ...defaultOptions,
            ...options
        };
    }
    writeRow(row) {
        this.rows.push(row);
    }
    toString() {
        const { padding, maxColumnWidth } = this.options;
        const wrappedRows = [];
        for (const row of this.rows) {
            const wrappedColumnLines = row.map(col => wrap(col, { width: maxColumnWidth, indent: "", trim: true }).split("\n"));
            const maxLines = Math.max(...wrappedColumnLines.map(lines => lines.length));
            const newRows = Array(maxLines)
                .fill(undefined)
                .map(() => Array(row.length)
                .fill(undefined)
                .map(() => ""));
            for (let i = 0; i < wrappedColumnLines.length; i++) {
                for (let j = 0; j < wrappedColumnLines[i].length; j++) {
                    newRows[j][i] = wrappedColumnLines[i][j];
                }
            }
            wrappedRows.push(...newRows);
        }
        const maxColumnLengths = new Map();
        for (const row of wrappedRows) {
            for (let colNum = 0; colNum < row.length; colNum++) {
                maxColumnLengths.set(colNum, Math.max(maxColumnLengths.get(colNum) || 0, row[colNum].length));
            }
        }
        const lines = [];
        for (const row of wrappedRows) {
            const paddedCols = row.map((col, i) => i !== row.length - 1
                ? utils_1.rightPad(col, (maxColumnLengths.get(i) || 0) + padding)
                : col);
            lines.push(utils_1.rightPad("", padding) + paddedCols.join(""));
        }
        return lines.join("\n");
    }
}
exports.default = TableWriter;
