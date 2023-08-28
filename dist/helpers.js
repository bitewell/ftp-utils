"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullPath = void 0;
var path_1 = __importDefault(require("path"));
function getFullPath(enviroment, remotePath) {
    var prefix = enviroment == 'test' ? "test" : "prod";
    return path_1.default.join(prefix, remotePath);
}
exports.getFullPath = getFullPath;
