"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramBuilder_1 = __importDefault(require("./ProgramBuilder"));
it(`Builds and executes a simple program`, async () => {
    const program = ProgramBuilder_1.default.newBuilder()
        .intFlag("--count", { dest: "count" })
        .build();
    let gotCount = 0;
    await program.execOrThrow(args => {
        gotCount = args.count;
    }, ["--count", "22"]);
    expect(gotCount).toEqual(22);
});
