import {Schema, model, Document} from "mongoose";
import Product, {IProductSchema} from "./Product";

export type cartItem = {
  productId: Schema.Types.ObjectId,
  quantity: cartItem
}

export interface IUserSchema extends Document {
  email: string,
  password: string,
  cart: {
    items: cartItem[],
    totalPrice: number
  }
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
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

userSchema.methods.addToCart = function (product: IProductSchema) {
  const idx = this.cart.items.findIndex((el: cartItem) => el.productId.toString() === product._id.toString());
  let newQuantity = 1
  const updateCartItems = [...this.cart.items];
  if (idx >= 0) {
    newQuantity = this.cart.items[idx].quantity + 1;
    updateCartItems[idx].quantity = newQuantity;
  } else {
    updateCartItems.push({
      productId: product._id,
      quantity: newQuantity
    })
  }
  const newTotal = this.cart.totalPrice + product.price
  this.cart = {items: updateCartItems, totalPrice: newTotal};
  return this.save()
}

userSchema.methods.removeFromCart = function (product: IProductSchema) {
  const idx = this.cart.items.findIndex((el: cartItem) => el.productId.toString() === product._id.toString());
  let updatedCartItems = [...this.cart.items];

  if (updatedCartItems[idx].quantity === 1) {
    updatedCartItems = updatedCartItems.filter((el: cartItem) => el.productId.toString() !== product._id.toString())
  } else {
    updatedCartItems[idx].quantity--
  }
  let newTotal = this.cart.totalPrice - product.price;
  this.cart = {items: updatedCartItems, totalPrice: newTotal}
  return this.save()
}

userSchema.methods.clearCart = function () {
  this.cart = {items: [], totalPrice: 0};
  return this.save();
}

export default model<IUserSchema>('User', userSchema)