import { ProgramBuilder, Arguments } from "../../src";

const program = ProgramBuilder.newBuilder()
  .arg('filename')
  .optionalArg('optional')
  .intFlag('--count,-c', { dest: 'count', default: 0 })
  .intFlag('--requiredCount', { dest: 'requiredCount' })
  .build();

function main(args: Arguments<typeof program>) {
  console.log('Arguments are:');
  console.log(JSON.stringify(args, null, 2));
}

program.exec(main);
