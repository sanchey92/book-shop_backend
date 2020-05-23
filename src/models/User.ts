import {Schema, model} from "mongoose";
import Product from "./Product";

const userSchema = new Schema({
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
          type: Schema.Types.ObjectId,
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

userSchema.methods.addToCart = function (product: any) {
  const idx = this.cart.items.findIndex((el: any) => el.productId === product._id);
  let newQuantity = 1;
  const updateCartItems = [...this.cart.items];

  if (idx >= 1) {
    newQuantity = this.cart.items[idx].quality + 1;
    updateCartItems[idx].quality = newQuantity;
  } else {
    updateCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    })
  }

  let newTotal = this.cart.totalPrice + product.price
  this.cart = {items: updateCartItems, totalPrice: newTotal};
  return this.save()
}

export default model('User', userSchema)