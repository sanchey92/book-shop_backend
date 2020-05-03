import {Router} from "express";
import {getCart, getProductById, getProducts, postCart} from '../controllers/shop'

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/cart', getCart);

router.post('/cart', postCart);

export default router

