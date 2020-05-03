import Product, {IProduct} from "../models/Product";
import {RequestHandler} from 'express';
import Cart from "../models/Cart";

type ID = {
  id: string
}

export const getProducts: RequestHandler = async (req, res) => {
  const products: IProduct[] = await Product.fetchAll();
  res.status(200).json({products: products});
}
export const getProductById: RequestHandler<ID> = async (req, res) => {
  const id = req.params.id;
  const product = await Product.fetchById(id);
  res.status(200).json({product: product});
}
export const getCart: RequestHandler = async (req, res) => {
  const cart = await Cart.getCart()
  res.status(200).json({cart: cart})
}
export const postCart: RequestHandler<ID> = async (req, res) => {
  const prodId = req.body.id
  const product = await Product.fetchById(prodId)
  await Cart.addToCart(prodId, product.price)
  res.status(200).json({message: 'done'})
}
