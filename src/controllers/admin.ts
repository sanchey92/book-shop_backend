import Product from "../models/Product";
import {RequestHandler} from "express";

export const postAddProduct: RequestHandler = async (req: any, res) => {
  const {title, imgUrl, price, description} = req.body;
  const userId = req.user;
  const product = new Product({title, imgUrl, price, description, userId});
  try {
    await product.save();
    res.status(200).json({message: 'done!'})
  } catch (err) {
    console.log(err)
  }
}

export const deleteProductById: RequestHandler = async (req, res) => {
  try {
    const prodId = req.params.id;
    await Product.findByIdAndDelete(prodId);
    const products = await Product.find();
    res.status(200).json({products})
  } catch (e) {
    console.log(e)
  }
}