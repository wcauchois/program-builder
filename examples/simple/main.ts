import { ProgramBuilder, Arguments } from "../../src";

const program = ProgramBuilder.newProgram()
  .intArg('--count,-c', { dest: 'count' })
  .intArg('--requiredCount', { dest: 'requiredCount', required: true })
  .build();

function main(args: Arguments<typeof program>) {
  console.log('count is', args.count);
  console.log('required count is', args.requiredCount);
}

program.exec(main);
