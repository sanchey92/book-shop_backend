import Product from "../models/Product";
import {RequestHandler} from "express";

export const postAddProduct: RequestHandler = async (req, res) => {
  const {title, imgUrl, price, description} = req.body;
  const product = new Product({title, imgUrl, price, description});
  try {
    await product.save();
    res.status(200).json({message: 'done!'})
  } catch (err) {
    console.log(err)
  }
}

// export const deleteProductById: RequestHandler = async (req, res) => {
//   const prodId = req.params.id;
//   await Product.deleteById(prodId);
//   const products: IProduct[] = await Product.fetchAll();
//   res.status(200).json({products})
// }
