"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = require("../controllers/users");
var router = express_1.Router();
router.post('/sign_up', users_1.postSignUp);
router.post('/sign_in', users_1.postSignIn);
exports.default = router;
