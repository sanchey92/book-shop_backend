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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var mainPath = path.join(__dirname, '..', 'data', 'products.json');
var getProductsFromFile = function () {
    return new Promise(function (resolve, reject) {
        fs.readFile(mainPath, function (error, data) {
            if (error) {
                resolve([]);
            }
            else {
                resolve(JSON.parse(data.toString()));
            }
        });
    });
};
var saveProductInFile = function (data) {
    fs.writeFile(mainPath, JSON.stringify(data), function (err) {
        if (err)
            throw err;
    });
};
var Product = /** @class */ (function () {
    function Product(id, title, imgUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
    }
    Product.fetchAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getProductsFromFile()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Product.fetchById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product, idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product.fetchAll()];
                    case 1:
                        product = _a.sent();
                        idx = product.findIndex(function (el) { return el.id === id; });
                        return [2 /*return*/, product[idx]];
                }
            });
        });
    };
    Product.prototype.save = function () {
        var _this = this;
        getProductsFromFile()
            .then(function (product) {
            if (_this.id) {
                var existProductIndex = product.findIndex(function (el) { return el.id === _this.id; });
                var updatedProducts = __spreadArrays(product);
                updatedProducts[existProductIndex] = _this;
                saveProductInFile(updatedProducts);
            }
            else {
                _this.id = Math.random().toString();
                product.push(_this);
                saveProductInFile(product);
            }
        });
    };
    Product.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var products, updateProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getProductsFromFile()];
                    case 1:
                        products = _a.sent();
                        updateProducts = products.filter(function (el) { return el.id !== id; });
                        return [4 /*yield*/, saveProductInFile(updateProducts)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Product;
}());
exports.default = Product;
