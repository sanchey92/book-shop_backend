import express, {Request, Response, NextFunction} from 'express';
import {json} from 'body-parser';
import shopRoutes from './routes/shop';
import adminRoutes from './routes/admin';

const app = express();

app.use(json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({message: error.message})
})

app.listen(3001, () => {
  console.log('server started!')
});

