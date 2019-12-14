# program-builder

This is a TypeScript-first library for building command-line interfaces.

You define your arguments and keyword arguments using a fluent [builder](https://en.wikipedia.org/wiki/Builder_pattern), which gives you a `Program` object. You can then define a `main` function in terms of the strongly typed arguments of that `Program`, and finally execute the main function against your program which will parse and provide commandline arguments.

## Example

```typescript
const program = ProgramBuilder.newProgram()
  .intArg('--count,-c', { dest: 'count' })
  .intArg('--requiredCount', { dest: 'requiredCount', required: true })
  .build();

function main(args: Arguments<typeof program>) {
  console.log('count is', args.count); // args.count: number | undefined
  console.log('required count is', args.requiredCount); // args.requiredCount: number
}

program.exec(main);
```
