import {Router} from "express";
import {postSignIn, postSignUp} from "../controllers/users";

const router = Router();

router.post('/sign_up', postSignUp);
router.post('/sign_in', postSignIn);

export default router;