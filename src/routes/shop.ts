import {Router} from "express";
import {getProducts, getProductById, postCart, getCart, postCartDeleteProduct} from '../controllers/shop'

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/cart', getCart);
router.post('/cart/:id', postCart);
router.delete('/cart/remove-product/:id', postCartDeleteProduct)

export default router