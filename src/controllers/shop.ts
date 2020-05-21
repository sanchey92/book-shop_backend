import Product  from "../models/Product";
import {RequestHandler} from 'express';

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

// export const getCart: RequestHandler = async (req, res) => {
//   const cartProducts = await getCartProducts()
//   res.status(200).json({cartProducts});
// }
//
// export const postCart: RequestHandler<ID> = async (req, res) => {
//   const product = await Product.fetchById(req.params.id)
//   await Cart.addToCart(req.params.id, product.price)
//   const cartProducts = await getCartProducts()
//   res.status(200).json({cartProducts})
// }
//
// export const postCartDeleteProduct: RequestHandler<ID> = async (req, res) => {
//   const id = req.body.id;
//   const product = await Product.fetchById(id);
//   await Cart.deleteFromCart(id, product.price);
//   const cartProducts = await getCartProducts();
//   res.json({cartProducts})
// }