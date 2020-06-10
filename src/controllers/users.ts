import {RequestHandler} from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const postSignUp: RequestHandler = async (req, res) => {
  try {
    const {email, password} = req.body;
    const candidate = await User.findOne({email})
    if (candidate) return  res.status(400).json({message: 'this email already registered'})
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({email, password: hashedPassword})
    await user.save()
    res.status(200).json({message: 'user created!'})
  } catch (e) {
    res.status(500).json({message: 'try again'})
  }
}

export const postSignIn: RequestHandler = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (!user) return res.status(400).json({message: 'Error! try again!'})
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({message: 'not correct data, try again!'})

    const token = jwt.sign(
      {userId: user._id},
      'secret string',
      {expiresIn: '1h'}
    )

    res.json({token, userId: user._id})
  } catch (e) {
    res.status(500).json({message: 'Error! Try again!!!'})
  }
}