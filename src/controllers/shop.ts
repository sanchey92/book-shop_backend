import Product, {IProduct} from "../models/Product";
import {RequestHandler} from 'express';

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
