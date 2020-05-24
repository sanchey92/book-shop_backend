import {Schema, model, Document} from 'mongoose';

export interface IProductSchema extends Document{
  title: string,
  imgUrl: string,
  price: number,
  description: string,
  userId: Schema.Types.ObjectId
}

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default model<IProductSchema>('Product', productSchema )

