import {Router} from "express";
import {getProducts} from '../controllers/shop'

const router = Router();

router.get('/products', getProducts);
// router.get('/products/:id', getProductById);
// router.get('/cart', getCart);
// router.get('/cart/:id', postCart);
// router.post('/cart/remove-product', postCartDeleteProduct)
//
export default router

