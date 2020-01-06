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

```typescript
const program = ProgramBuilder.newBuilder()
  .arg("filename")
  .intFlag("--count", { dest: "count" })
  .build()

program.exec(args => {
  console.log(`Filename is ${args.filename}, count is ${args.count}`);
});
```
