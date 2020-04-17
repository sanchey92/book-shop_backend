import {Router} from "express";
import {postAddProduct} from '../controllers/admin'

const router = Router();

router.post('/add-product', postAddProduct)

export default router
