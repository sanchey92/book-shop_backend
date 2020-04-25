import {Router} from "express";
import {deleteProductById, postAddProduct} from '../controllers/admin'

const router = Router();

router.post('/add-product', postAddProduct);

router.delete('/delete-product/:id', deleteProductById)

export default router
