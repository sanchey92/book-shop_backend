import {Router} from "express";
import {
  getProducts,
  getProductById,
  postCart,
  getCart,
  postCartDeleteProduct,
  postOrders,
  getOrders
} from '../controllers/shop'

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/cart', getCart);
router.get('/orders', getOrders);
router.post('/create-order', postOrders);
router.post('/cart/:id', postCart);
router.delete('/cart/remove-product/:id', postCartDeleteProduct);


export default router