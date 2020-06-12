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
var User_1 = __importDefault(require("../models/User"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.postSignUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, candidate, hashedPassword, user, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                candidate = _b.sent();
                if (candidate)
                    return [2 /*return*/, res.status(400).json({ message: 'this email already registered' })];
                return [4 /*yield*/, bcrypt_1.default.hash(password, 12)];
            case 2:
                hashedPassword = _b.sent();
                user = new User_1.default({ email: email, password: hashedPassword });
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                res.status(200).json({ message: 'user created!' });
                return [3 /*break*/, 5];
            case 4:
                e_1 = _b.sent();
                res.status(500).json({ message: 'try again' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.postSignIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isMatch, token, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: 'Error! try again!' })];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch)
                    return [2 /*return*/, res.status(400).json({ message: 'not correct data, try again!' })];
                token = jsonwebtoken_1.default.sign({ userId: user._id }, 'secret string', { expiresIn: '1h' });
                res.json({ token: token, userId: user._id });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                res.status(500).json({ message: 'Error! Try again!!!' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
