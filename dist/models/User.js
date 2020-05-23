"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0
        }
    }
});
userSchema.methods.addToCart = function (product) {
    var idx = this.cart.items.findIndex(function (el) { return el.productId === product._id; });
    var newQuantity = 1;
    var updateCartItems = __spreadArrays(this.cart.items);
    if (idx >= 1) {
        newQuantity = this.cart.items[idx].quality + 1;
        updateCartItems[idx].quality = newQuantity;
    }
    else {
        updateCartItems.push({
            productId: product._id,
            quantity: newQuantity,
        });
    }
    var newTotal = this.cart.totalPrice + product.price;
    this.cart = { items: updateCartItems, totalPrice: newTotal };
    return this.save();
};
exports.default = mongoose_1.model('User', userSchema);
