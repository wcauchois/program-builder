---
id: examples
title: Examples
sidebar_label: Examples
---

# Table of Contents

# Boolean flags

Use `.flag()` to specify a boolean flag. The first argument is the name of the flag,
including leading dashes (ex: `"--count"`).

Multiple names can be specified by separating them with commas within the same string
(ex: `"-c,--count"`).

The second argument is a list of options for the flag. The only required one of these
is `dest`, which indicates where to store the flag value within the arguments object
that is passed to your main function.

```typescript
const program = ProgramBuilder.newBuilder()
  .flag("-v,--verbose", { dest: "verbose" })
  .build();
```

# Valued flags

Flags can also take on a value, which the user specifies by providing a string
immediately succeeding the flag on the commandline.

Valued flags are specified by calling one of several methods that are specialized
to the desired type of the flag: string, integer, etc.

The typed value is then stored in the specified `dest`.

```typescript
const program = ProgramBuilder.newBuilder()
  .intFlag("--count", { dest: "count" })
  .stringFlag("--name", { dest: "name" })
  .build();

// args is typed as: { count: number, name: string }
```

The current types of valued flags are:

- [`stringFlag`](api/program-builder.programbuilder.stringflag.md)
- [`intFlag`](api/program-builder.programbuilder.intflag.md)
- [`floatFlag`](api/program-builder.programbuilder.floatflag.md)
- [`customFlag`](api/program-builder.programbuilder.customflag.md) – allows you to provide your own
  converter function from a string to your custom type.

# Optional vs Required Flags

Valued flags are required unless a `default` is specified. If a required flag
isn't provided, the program will exit with a non-zero return code. Required flags
will be typed as non-undefined, whereas optional flags will be typed as `type | undefined`.

```typescript
const program = ProgramBuilder.newBuilder()
  .intFlag("--count", { dest: "count" })
  .intFlag("--optionalCount", { dest: "optionalCount", default: 0 })
  .build();

program.exec(args => console.log(args));
```

# Adding a Description

Call [`.description()`](api/program-builder.programbuilder.description.md) on a ProgramBuilder
to set the program's description to be used in help text generation.

```typescript
const program = ProgramBuilder.newBuilder()
  .description(`My awesome program`)
  .build();
```

# Subcommands

Use `ProgramBuilder.buildWithSubcommands` to create a program with multiple sub-commands.
This accepts a map from subcommand name to a `ProgramWithAction` representing the subcommand
flags and the action to be performed when executing the subcommand.

A `ProgramWithAction` can be created by calling `.bind()` on a `ProgramBuilder` instead of
`.build()`. `.bind()` accepts a `MainFunction` as its argument, indicating the function to be
called when that subcommand is specified.

The map can be multiply nested, for subcommands that have child-subcommands which are separated
by spaces. For example `{nested: {subcommand: someProgram}}` would result in a subcommand named
`"nested subcommand"`.

```typescript
function generateMain(args: Arguments<typeof generate>) {
  console.log(`Generating to ${args.filename}`);
}

function cleanMain(args: Arguments<typeof clean>) {
  console.log('Cleaning output directory');
}

function nestedMain(args: Arguments<typeof nested>) {
  console.log(`This is a nested subcommand ${args.x}`);
}

const generate = ProgramBuilder.newBuilder()
  .description(`Generate something`)
  .arg('filename')
  .bind(generateMain);

const clean = ProgramBuilder.newBuilder()
  .description('Clean the output directory')
  .bind(cleanMain);

const nested = ProgramBuilder.newBuilder()
  .flag('-x', { dest: 'x' })
  .bind(nestedMain);

const program = ProgramBuilder.buildWithSubcommands({
  generate,
  clean,
  this: {
    is: {
      nested
    }
  }
});

// Execute the program. Note this doesn't take a main function, like
// a normal Program.exec().
program.exec();
```
