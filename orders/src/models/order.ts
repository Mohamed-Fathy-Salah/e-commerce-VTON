import { OrderStatus } from "@mfsvton/common";
import mongoose from "mongoose";
import { CartDoc } from "./cart";

// An interface that describes the properties
// that are requried to create a new User
interface OrderAttrs {
    customerId: string;
    cart: CartDoc;
    status: OrderStatus;
    expiresAt: Date;
}

// An interface that describes the properties
// that a User Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

// An interface that describes the properties
// that a User Document has
interface OrderDoc extends mongoose.Document {
    customerId: string;
    cart: CartDoc;
    status: OrderStatus;
    expiresAt: Date;
}

const orderSchema = new mongoose.Schema(
  {
      customerId: {
          type: String,
          required: true
      }, 
      status: {
            typd: String,
            enum: Object.values(OrderStatus),
            required: true
      },
      cart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cart"
      }, 
      expiresAt: {
          type: mongoose.Schema.Types.Date
      }
  },{
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>(
  "Order",
  orderSchema
);

export { Order };
