import Product from "../models/Product";
import {RequestHandler} from "express";

export const postAddProduct: RequestHandler = (req, res) => {
  console.log(req.body)
  const {title, imgUrl, price, description} = req.body;
  const product = new Product(null, title, imgUrl, price, description);
  product.save();
  res.status(200).json({message: 'done!'})
}
