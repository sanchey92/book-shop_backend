import {Schema, model, Document} from "mongoose";

interface IOrder extends Document {
  products: any[],
  user: string,
  userId: Schema.Types.ObjectId
}

const orderSchema = new Schema({
  products: [{
    product: {type: Object, required: true},
    quantity:{type: Number, required: true}
  }],
  user: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
})

export default model<IOrder>('Order', orderSchema)