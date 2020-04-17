"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var shop_1 = __importDefault(require("./routes/shop"));
var admin_1 = __importDefault(require("./routes/admin"));
var app = express_1.default();
app.use(body_parser_1.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/shop', shop_1.default);
app.use('/admin', admin_1.default);
app.use(function (error, req, res, next) {
    res.status(500).json({ message: error.message });
});
app.listen(3001, function () {
    console.log('server started!');
});
