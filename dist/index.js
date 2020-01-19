"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * See {@link @wcauchois/program-builder#ProgramBuilder}.
 *
 * @packageDocumentation
 */
const ProgramBuilder_1 = __importDefault(require("./lib/ProgramBuilder"));
exports.ProgramBuilder = ProgramBuilder_1.default;
const ProgramBase_1 = __importDefault(require("./lib/ProgramBase"));
exports.ProgramBase = ProgramBase_1.default;
const ProgramWithAction_1 = __importDefault(require("./lib/ProgramWithAction"));
exports.ProgramWithAction = ProgramWithAction_1.default;
const Program_1 = __importDefault(require("./lib/Program"));
exports.Program = Program_1.default;
const ValuedFlag_1 = __importDefault(require("./lib/ValuedFlag"));
exports.ValuedFlag = ValuedFlag_1.default;
const PositionalArguments_1 = __importDefault(require("./lib/PositionalArguments"));
exports.PositionalArguments = PositionalArguments_1.default;
const Flag_1 = __importDefault(require("./lib/Flag"));
exports.Flag = Flag_1.default;
const PositionalArgument_1 = __importDefault(require("./lib/PositionalArgument"));
exports.PositionalArgument = PositionalArgument_1.default;
const errors_1 = require("./lib/errors");
exports.ProgramError = errors_1.ProgramError;
exports.ArgumentError = errors_1.ArgumentError;
exports.FlagParseError = errors_1.FlagParseError;
exports.TooManyArgumentsError = errors_1.TooManyArgumentsError;
const FlagDocumentation_1 = __importDefault(require("./lib/FlagDocumentation"));
exports.FlagDocumentation = FlagDocumentation_1.default;
const TableWriter_1 = __importDefault(require("./lib/TableWriter"));
exports.TableWriter = TableWriter_1.default;
