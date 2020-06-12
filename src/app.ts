import express, {Request, Response, NextFunction} from 'express';
import {connect} from 'mongoose';
import {json} from 'body-parser';
import shopRoutes from './routes/shop';
import adminRoutes from './routes/admin';
import userRoutes from './routes/users'
import auth from "./middleware/auth.middleware";


const app = express();
app.use(json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.use((error: Error, req: Request, res: Response) => {
  res.status(500).json({message: error.message})
})

app.use(auth)

const start = async () => {
  try {
    const URL = 'mongodb+srv://Alex:Liverpool1892@cluster0-pu5lh.mongodb.net/shop?retryWrites=true&w=majority'
    await connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(3001);
  } catch (error) {
    throw new Error(error);
  }
};

start().then(() => console.log('server started!'));