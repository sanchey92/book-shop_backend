import Product from "../models/Product";
import {RequestHandler} from 'express';
import {Req} from "../app";
import { getCartProductInfo } from "../utils/utils";

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

export const getCart = async (req: Req, res: Response) => {
  try {
    return getCartProductInfo(req, res);
  } catch (e) {
    console.log(e)
  }
}

export const postCart: RequestHandler<ID> = async (req: Req, res) => {
  try {
    const idx = req.params.id;
    const product = await Product.findById(idx)
    await req.user.addToCart(product)
    return getCartProductInfo(req, res);
  } catch (e) {
    console.log(e)
  }
}

export const postCartDeleteProduct: RequestHandler<ID> = async (req: Req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id);
    await req.user.removeFromCart(product);
    return getCartProductInfo(req, res);
  } catch (e) {
    console.log(e)
  }
}