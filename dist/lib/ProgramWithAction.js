"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Program_1 = __importDefault(require("./Program"));
class ProgramWithAction extends Program_1.default {
    constructor(options, action) {
        super(options);
        this.action = action;
    }
}
exports.default = ProgramWithAction;
