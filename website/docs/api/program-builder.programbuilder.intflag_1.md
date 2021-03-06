---
id: program-builder.programbuilder.intflag_1
title: ProgramBuilder.intFlag() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@wcauchois/program-builder](./program-builder.md) &gt; [ProgramBuilder](./program-builder.programbuilder.md) &gt; [intFlag](./program-builder.programbuilder.intflag_1.md)

## ProgramBuilder.intFlag() method

Add a required valued flag to the program.

<b>Signature:</b>

```typescript
intFlag<K extends string>(name: string, options: INonNullValuedFlagOptions<K, number>): ExtendProgramBuilderWithRequired<T, K, number>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  name | <code>string</code> | The name for the flag, including leading dashes. Multiple alternative names may be specified by separating them within the string by commas. For example, <code>&quot;-i,--input&quot;</code>. |
|  options | <code>INonNullValuedFlagOptions&lt;K, number&gt;</code> | See [INonNullValuedFlagOptions](./program-builder.inonnullvaluedflagoptions.md)<!-- -->. |

<b>Returns:</b>

`ExtendProgramBuilderWithRequired<T, K, number>`
