import Product from "../models/Product";
import {RequestHandler} from 'express';
import {getCartProductInfo} from "../utils/utils";
import {cartItem} from "../models/User";
import Order from "../models/Order";

type ID = {
  id: any
}

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({products: products});
  } catch (e) {
    console.log(e)
  }
}

export const getProductById: RequestHandler<ID> = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({product: product});
  } catch (e) {
    console.log(e)
  }
}

export const getCart: RequestHandler = async (req, res) => {
  try {
    return getCartProductInfo(req, res);
  } catch (e) {
    console.log(e)
  }
}

export const postCart: RequestHandler<ID> = async (req: any, res) => {
  try {
    const idx = req.params.id;
    const product = await Product.findById(idx)
    await req.user.addToCart(product)
    return getCartProductInfo(req, res);
  } catch (e) {
    console.log(e)
  }
}

export const postCartDeleteProduct: RequestHandler<ID> = async (req: any, res) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id);
    await req.user.removeFromCart(product);
    return getCartProductInfo(req, res);
  } catch (e) {
    console.log(e)
  }
}

export const postOrders: RequestHandler = async (req: any, res) => {
  try {
    const user = await req.user.populate('cart.items.productId').execPopulate();
    const products = user.cart.items.map((el: cartItem) => {
      // @ts-ignore
      return {quantity: el.quantity, product: {...el.productId._doc}}
    })
    const order = new Order({user: {name: user.name, userId: user}, products, totalPrice: req.user.cart.totalPrice})
    return order
      .save()
      .then(() => user.clearCart())
      .then(() => getCartProductInfo(req, res));
  } catch (e) {
    console.log(e)
  }
};

export const getOrders: RequestHandler = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({orders})
  } catch (e) {
    console.log(e)
  }
}