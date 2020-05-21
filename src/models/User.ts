import {Schema, model, Document} from "mongoose";

export interface IUSer extends Document{
  name: string,
  email: string,
  cart: any,
  quantity: number
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  }
});

export default model<IUSer>('User', userSchema)