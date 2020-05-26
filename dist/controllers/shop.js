"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Product_1 = __importDefault(require("../models/Product"));
var utils_1 = require("../utils/utils");
var Order_1 = __importDefault(require("../models/Order"));
exports.getProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Product_1.default.find()];
            case 1:
                products = _a.sent();
                res.status(200).json({ products: products });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Product_1.default.findById(id)];
            case 1:
                product = _a.sent();
                res.status(200).json({ product: product });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            return [2 /*return*/, utils_1.getCartProductInfo(req, res)];
        }
        catch (e) {
            console.log(e);
        }
        return [2 /*return*/];
    });
}); };
exports.postCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idx, product, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                idx = req.params.id;
                return [4 /*yield*/, Product_1.default.findById(idx)];
            case 1:
                product = _a.sent();
                return [4 /*yield*/, req.user.addToCart(product)];
            case 2:
                _a.sent();
                return [2 /*return*/, utils_1.getCartProductInfo(req, res)];
            case 3:
                e_3 = _a.sent();
                console.log(e_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postCartDeleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Product_1.default.findById(id)];
            case 1:
                product = _a.sent();
                return [4 /*yield*/, req.user.removeFromCart(product)];
            case 2:
                _a.sent();
                return [2 /*return*/, utils_1.getCartProductInfo(req, res)];
            case 3:
                e_4 = _a.sent();
                console.log(e_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_1, products, order, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, req.user.populate('cart.items.productId').execPopulate()];
            case 1:
                user_1 = _a.sent();
                products = user_1.cart.items.map(function (el) {
                    // @ts-ignore
                    return { quantity: el.quantity, product: __assign({}, el.productId._doc) };
                });
                order = new Order_1.default({ user: { name: user_1.name, userId: user_1 }, products: products, totalPrice: req.user.cart.totalPrice });
                return [2 /*return*/, order
                        .save()
                        .then(function () { return user_1.clearCart(); })
                        .then(function () { return utils_1.getCartProductInfo(req, res); })];
            case 2:
                e_5 = _a.sent();
                console.log(e_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order_1.default.find()];
            case 1:
                orders = _a.sent();
                res.json({ orders: orders });
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                console.log(e_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
