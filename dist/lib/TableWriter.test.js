"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TableWriter_1 = __importDefault(require("./TableWriter"));
it("Wraps a table", () => {
    const tw = new TableWriter_1.default();
    tw.writeRow([
        "hi",
        `Long line that should get wrapped. Long line that should get wrapped. Long line that should get wrapped. Long line that should get wrapped.`
    ]);
    tw.writeRow(["again", "hi again"]);
    expect(tw.toString())
        .toEqual(`  hi     Long line that should get wrapped. Long line that should get
         wrapped. Long line that should get wrapped. Long line that
         should get wrapped.
  again  hi again`);
});
