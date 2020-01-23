import { ProgramBuilder, Arguments, Converter } from "../../src";

const jsonConverter: Converter<any> = (input, argName) => JSON.parse(input);

const program = ProgramBuilder.newBuilder()
  .customFlag('--jsonInput', { dest: 'json' }, jsonConverter)
  .build();

program.exec(args => {
  console.log('Args are:', args);
});