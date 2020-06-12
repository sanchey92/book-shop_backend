import jwt from 'jsonwebtoken'
import {RequestHandler} from "express";

const auth: RequestHandler = async (req: any, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return  res.status(401).json({message: 'error!!!'})
    const decoded = jwt.verify(token, 'secret string')
    req.user = decoded;
    next()
  } catch (e) {
    console.log(e)
  }
}

export default auth