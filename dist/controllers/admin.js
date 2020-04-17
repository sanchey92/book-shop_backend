"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = __importDefault(require("../models/Product"));
exports.postAddProduct = function (req, res) {
    console.log(req.body);
    var _a = req.body, title = _a.title, imgUrl = _a.imgUrl, price = _a.price, description = _a.description;
    var product = new Product_1.default(null, title, imgUrl, price, description);
    product.save();
    res.status(200).json({ message: 'done!' });
};
