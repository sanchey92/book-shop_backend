import Product, {IProduct} from "../models/Product";
import {RequestHandler} from 'express';
import Cart from "../models/Cart";
import { getCartProducts } from "../utils/controllers.utils";

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
  const cartProducts = await getCartProducts()
  res.status(200).json({cartProducts});
}

export const postCart: RequestHandler<ID> = async (req, res) => {
  const product = await Product.fetchById(req.params.id)
  await Cart.addToCart(req.params.id, product.price)
  const cartProducts = await getCartProducts()
  res.status(200).json({cartProducts})
}

export const postCartDeleteProduct: RequestHandler<ID> = async (req, res) => {
  const id = req.body.id;
  const product = await Product.fetchById(id);
  await Cart.deleteFromCart(id, product.price);
  const cartProducts = await getCartProducts();
  res.json({cartProducts})
}