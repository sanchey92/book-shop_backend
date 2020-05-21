"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var admin_1 = require("../controllers/admin");
var router = express_1.Router();
router.post('/add-product', admin_1.postAddProduct);
router.delete('/delete-product/:id', admin_1.deleteProductById);
exports.default = router;
