"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePath = exports.checkExistsPath = exports.listAll = void 0;
var path_1 = __importDefault(require("path"));
var basic_ftp_1 = require("basic-ftp");
var helpers_1 = require("./helpers");
function getPassiveClient(ftpCredentials) {
    return new Promise(function (resolve, reject) {
        var client = new basic_ftp_1.Client();
        client.access(ftpCredentials).then(function () {
            resolve(client);
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
function listAll(ftpCredentials, remotePath) {
    return __awaiter(this, void 0, void 0, function () {
        var output, client, fullPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    output = [];
                    return [4 /*yield*/, getPassiveClient(ftpCredentials)];
                case 1:
                    client = _a.sent();
                    fullPath = (0, helpers_1.getFullPath)(ftpCredentials.enviroment, remotePath);
                    return [4 /*yield*/, client.list(fullPath)];
                case 2:
                    output = _a.sent();
                    output = output.map(function (item) { return path_1.default.join(fullPath, item.name); });
                    client.close();
                    return [2 /*return*/, output];
            }
        });
    });
}
exports.listAll = listAll;
function checkExistsPath(ftpCredentials, remotePath) {
    return __awaiter(this, void 0, void 0, function () {
        var parts, parentDir, files, fullPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parts = remotePath.split("/");
                    parentDir = parts.slice(0, parts.length - 1).join('/');
                    return [4 /*yield*/, listAll(ftpCredentials, parentDir)
                        //console.info(files)
                    ];
                case 1:
                    files = _a.sent();
                    fullPath = (0, helpers_1.getFullPath)(ftpCredentials.enviroment, remotePath);
                    //console.info(fullPath, remotePath)
                    return [2 /*return*/, files.includes(fullPath)];
            }
        });
    });
}
exports.checkExistsPath = checkExistsPath;
function removePath(ftpCredentials, remotePath) {
    return __awaiter(this, void 0, void 0, function () {
        var exists, fullPath, client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkExistsPath(ftpCredentials, remotePath)];
                case 1:
                    exists = _a.sent();
                    if (!exists) {
                        throw new Error("File not found!");
                    }
                    fullPath = (0, helpers_1.getFullPath)(ftpCredentials.enviroment, remotePath);
                    return [4 /*yield*/, getPassiveClient(ftpCredentials)];
                case 2:
                    client = _a.sent();
                    return [4 /*yield*/, client.remove(fullPath).then(function () { return client.close(); })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.removePath = removePath;
