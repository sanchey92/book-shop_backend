"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var shop_1 = require("../controllers/shop");
var router = express_1.Router();
router.get('/products', shop_1.getProducts);
router.get('/products/:id', shop_1.getProductById);
router.get('/cart', shop_1.getCart);
router.post('/cart/:id', shop_1.postCart);
router.delete('/cart/remove-product/:id', shop_1.postCartDeleteProduct);
exports.default = router;
