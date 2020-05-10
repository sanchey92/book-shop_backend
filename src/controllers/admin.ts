import Product, {IProduct} from "../models/Product";
import {RequestHandler} from "express";

export const postAddProduct: RequestHandler = async (req, res) => {
  const {title, imgUrl, price, description} = req.body;
  const product = await new Product(null, title, imgUrl, price, description);
  product.save();
  res.status(200).json({message: 'done!'})
}

export const deleteProductById: RequestHandler = async (req, res) => {
  const prodId = req.params.id;
  await Product.deleteById(prodId);
  const products: IProduct[] = await Product.fetchAll();
  res.status(200).json({products})
}
