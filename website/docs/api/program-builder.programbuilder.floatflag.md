---
id: program-builder.programbuilder.floatflag
title: ProgramBuilder.floatFlag() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@wcauchois/program-builder](./program-builder.md) &gt; [ProgramBuilder](./program-builder.programbuilder.md) &gt; [floatFlag](./program-builder.programbuilder.floatflag.md)

## ProgramBuilder.floatFlag() method

Add an optional valued flag to the program.

<b>Signature:</b>

```typescript
floatFlag<K extends string>(name: string, options: INullableValuedFlagOptions<K, number>): ExtendProgramBuilderWithOptional<T, K, number>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  name | <code>string</code> | The name for the flag, including leading dashes. Multiple alternative names may be specified by separating them within the string by commas. For example, <code>&quot;-i,--input&quot;</code>. |
|  options | <code>INullableValuedFlagOptions&lt;K, number&gt;</code> | See [INullableValuedFlagOptions](./program-builder.inullablevaluedflagoptions.md)<!-- -->. |

<b>Returns:</b>

`ExtendProgramBuilderWithOptional<T, K, number>`
