---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

# Introduction

Program Builder is a library for building command-line interfaces in
[TypeScript](https://www.typescriptlang.org/).

# Installation

```
yarn add @wcauchois/program-builder
```

# Basic Usage

`ProgramBuilder` uses the builder pattern to construct a `Program` object that can
then be executed against a main function.

You can create a `ProgramBuilder` instance by calling `ProgramBuilder.newBuilder`,
then call methods on that builder to specify positional arguments and flags,
then call `.build()` to build a `Program` object.

Finally, call `.exec(main)` on your Program to execute your program.

The `main` function gets a strongly typed object containing the values of your flags.

```typescript
const program = ProgramBuilder.newBuilder()
  .arg('filename')
  .intFlag('--count', { dest: "count" })
  .build();

program.exec(args => {
  // args: { filename: string, count: number }`
  console.log(`Filename is ${args.filename} and count is ${args.count}`);
});
```
