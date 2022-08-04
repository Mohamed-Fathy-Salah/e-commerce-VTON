import { GarmentSize, OrderStatus } from "@mfsvton/common";
import mongoose from "mongoose";
import { CartDoc } from "./cart";

// An interface that describes the properties
// that are requried to create a new User
interface OrderAttrs {
  customerId: string;
  garments: [
    {
      garmentId: string;
      quantity: number;
      price: number;
      size: GarmentSize;
    }
  ];
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
  garments: [
    {
      garmentId: string;
      quantity: number;
      price: number;
      size: GarmentSize;
    }
  ];
  status: OrderStatus;
  expiresAt: Date;
}

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    status: {
      typd: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    garments: [
      {
        garmentId: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
        size: {
          type: String,
          enum: Object.values(GarmentSize),
        },
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
