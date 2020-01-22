import { ProgramBuilder, Arguments } from "../../src";

const program = ProgramBuilder.newBuilder()
  .intFlag("--count", { dest: "count" })
  .intFlag("--optionalCount", { dest: "optionalCount", default: 0 })
  .build();

program.exec(args => {
  // args: { count: number, name: string }
  console.log('Args are:', args);
});
