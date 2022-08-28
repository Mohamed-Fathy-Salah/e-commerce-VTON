import { OrderStatus } from "@mfsvton/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties
// that are requried to create a new User
interface OrderAttrs {
  customerId: string;
  garments: {
      adminId: string;
      garmentId: string;
      price: number;
      small: number;
      medium: number;
      large: number;
      xlarge: number;
      xxlarge: number;
    }[];
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
  garments: {
      adminId: string;
      garmentId: string;
      price: number;
      small: number;
      medium: number;
      large: number;
      xlarge: number;
      xxlarge: number;
    }[];
  status: OrderStatus;
  expiresAt: Date;
  version: number;
}

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    garments: [
      {
        adminId: String,
        garmentId: String,
        price: Number,
        small: Number,
        medium: Number,
        large: Number,
        xlarge: Number,
        xxlarge: Number,
      },
      {
        _id: false,
      },
    ],
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

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
