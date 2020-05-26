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
                    required: true,
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
    var idx = this.cart.items.findIndex(function (el) { return el.productId.toString() === product._id.toString(); });
    var newQuantity = 1;
    var updateCartItems = __spreadArrays(this.cart.items);
    if (idx >= 0) {
        newQuantity = this.cart.items[idx].quantity + 1;
        updateCartItems[idx].quantity = newQuantity;
    }
    else {
        updateCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    var newTotal = this.cart.totalPrice + product.price;
    this.cart = { items: updateCartItems, totalPrice: newTotal };
    return this.save();
};
userSchema.methods.removeFromCart = function (product) {
    var idx = this.cart.items.findIndex(function (el) { return el.productId.toString() === product._id.toString(); });
    var updatedCartItems = __spreadArrays(this.cart.items);
    if (updatedCartItems[idx].quantity === 1) {
        updatedCartItems = updatedCartItems.filter(function (el) { return el.productId.toString() !== product._id.toString(); });
    }
    else {
        updatedCartItems[idx].quantity--;
    }
    var newTotal = this.cart.totalPrice - product.price;
    this.cart = { items: updatedCartItems, totalPrice: newTotal };
    return this.save();
};
userSchema.methods.clearCart = function () {
    this.cart = { items: [], totalPrice: 0 };
    return this.save();
};
exports.default = mongoose_1.model('User', userSchema);
