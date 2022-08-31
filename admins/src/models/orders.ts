import { OrderStatus } from "@mfsvton/common";
import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Order
interface OrderAttrs {
  orderId: string;
  adminId: string;
  customerId: string;
  garments: {
    garmentId: string;
    price: number;
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    xxlarge: number;
  };
  status: OrderStatus;
  version: number;
}

// An interface that describes the properties
// that a Order Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

// An interface that describes the properties
// that a Order Document has
export interface OrderDoc extends mongoose.Document {
  orderId: string;
  adminId: string;
  customerId: string;
  garments: {
    garmentId: string;
    price: number;
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    xxlarge: number;
  };
  status: OrderStatus;
  version: number;
}

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    adminId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    customerId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    garments: {
      garmentId: mongoose.Types.ObjectId,
      price: Number,
      small: Number,
      medium: Number,
      large: Number,
      xlarge: Number,
      xxlarge: Number,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set("versionKey", "version");
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
