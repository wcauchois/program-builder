---
id: program-builder.programbuilder.customflag_1
title: ProgramBuilder.customFlag() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@wcauchois/program-builder](./program-builder.md) &gt; [ProgramBuilder](./program-builder.programbuilder.md) &gt; [customFlag](./program-builder.programbuilder.customflag_1.md)

## ProgramBuilder.customFlag() method

Add a required custom valued flag to the program.

<b>Signature:</b>

```typescript
customFlag<K extends string, V>(name: string, options: INonNullValuedFlagOptions<K, V>, converter: Converter<V>): ExtendProgramBuilderWithRequired<T, K, V>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  name | <code>string</code> | The name for the flag, including leading dashes. Multiple alternative names may be specified by separating them within the string by commas. For example, <code>&quot;-i,--input&quot;</code>. |
|  options | <code>INonNullValuedFlagOptions&lt;K, V&gt;</code> | See [INonNullValuedFlagOptions](./program-builder.inonnullvaluedflagoptions.md)<!-- -->. |
|  converter | <code>Converter&lt;V&gt;</code> | A [Converter](./program-builder.converter.md) capable of converting a string to the desired type. |

<b>Returns:</b>

`ExtendProgramBuilderWithRequired<T, K, V>`
