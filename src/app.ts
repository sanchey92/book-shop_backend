import express, {Request, Response, NextFunction} from 'express';
import {connect} from 'mongoose';
import {json} from 'body-parser';
import User from "./models/User";
import shopRoutes from './routes/shop';
import adminRoutes from './routes/admin';

export interface Req extends Request {
  // @ts-ignore
  user?: User
}

const app = express();
app.use(json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(async (req: Req, res: Response, next: NextFunction)=> {
  try {
    const user = await User.findById('5ec7e67bcb25cf36ff34e9a0')
    req.user = user;
    next()
  } catch (e) {
    console.log(e);
  }
})

app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);

app.use((error: Error, req: Request, res: Response) => {
  res.status(500).json({message: error.message})
})

const start = async () => {
  try {
    const URL = 'mongodb+srv://Alex:Liverpool1892@cluster0-pu5lh.mongodb.net/shop?retryWrites=true&w=majority'
    await connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const candidate = User.findOne();
    if (!candidate) {
     const user = new User({
       name: 'Alexandr',
       email: 'test@gmail.com',
       cart: {items: []}
     })
      await user.save()
    }
    app.listen(3001);
  } catch (error) {
    throw new Error(error);
  }
};

start().then(() => console.log('server started!'));