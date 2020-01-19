/**
 * See {@link @wcauchois/program-builder#ProgramBuilder}.
 *
 * @packageDocumentation
 */
import ProgramBuilder, {
  ExtendProgramBuilderWithRequired,
  ExtendProgramBuilderWithOptional
} from "./lib/ProgramBuilder";
import { Arguments } from "./lib/arguments";
import ProgramBase, { IProgramBaseOptions } from "./lib/ProgramBase";
import {
  IPositionalArgumentMetadata,
  IOptionalValuedFlagOptions,
  Converter,
  IRequiredValuedFlagOptions,
  IFlagOptions,
  ProgramMain,
  IProgramMetadata,
  IValuedFlagCommonOptions,
  IValuedFlagMetadata,
  IAnyFlag,
  IFlagMetadata
} from "./lib/types";
import ProgramWithAction from "./lib/ProgramWithAction";
import Program from "./lib/Program";
import ValuedFlag from "./lib/ValuedFlag";
import PositionalArguments from "./lib/PositionalArguments";
import Flag from "./lib/Flag";
import PositionalArgument from "./lib/PositionalArgument";
import {
  ProgramError,
  ArgumentError,
  FlagParseError,
  TooManyArgumentsError
} from "./lib/errors";

export {
  ProgramBuilder,
  Arguments,
  ProgramBase,
  IPositionalArgumentMetadata,
  ExtendProgramBuilderWithRequired,
  ExtendProgramBuilderWithOptional,
  IOptionalValuedFlagOptions,
  Converter,
  IRequiredValuedFlagOptions,
  IFlagOptions,
  ProgramMain,
  ProgramWithAction,
  Program,
  IProgramBaseOptions,
  ValuedFlag,
  PositionalArguments,
  Flag,
  IProgramMetadata,
  IValuedFlagCommonOptions,
  IFlagMetadata,
  IAnyFlag,
  IValuedFlagMetadata,
  PositionalArgument,
  ProgramError,
  FlagParseError,
  ArgumentError,
  TooManyArgumentsError
};
