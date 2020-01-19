---
id: program-builder.ivaluedflagcommonoptions
title: IValuedFlagCommonOptions interface
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@wcauchois/program-builder](./program-builder.md) &gt; [IValuedFlagCommonOptions](./program-builder.ivaluedflagcommonoptions.md)

## IValuedFlagCommonOptions interface

Common options for a valued flag.

<b>Signature:</b>

```typescript
export interface IValuedFlagCommonOptions<K extends string> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [description](./program-builder.ivaluedflagcommonoptions.description.md) | <code>string</code> | A description for the flag used in help text generation. |
|  [dest](./program-builder.ivaluedflagcommonoptions.dest.md) | <code>K</code> | The destination key in the final arguments object into which this argument's value will be stored. |
|  [metavar](./program-builder.ivaluedflagcommonoptions.metavar.md) | <code>string</code> | A metavariable for the flag used in help text generation. Defaults to [IValuedFlagCommonOptions.dest](./program-builder.ivaluedflagcommonoptions.dest.md)<!-- -->. |