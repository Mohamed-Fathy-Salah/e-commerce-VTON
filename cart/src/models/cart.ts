import { GarmentSize } from "@mfsvton/common";
import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
interface CartAttrs {
    customerId: string;
}

// An interface that describes the properties
// that a User Model has
interface CartModel extends mongoose.Model<CartDoc> {
  build(attrs: CartAttrs): CartDoc;
}

// An interface that describes the properties
// that a User Document has
interface CartDoc extends mongoose.Document {
    customerId: string;
    garments: [{
        garmentId: string,
        quantity: number,
        price: number,
        size: GarmentSize
    }]
}

const cartSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
    },
    garments: [{
        garmentId: {
            type: String,
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number
        },
        size: {
            type: String,
            enum: Object.values(GarmentSize)
        }
    }, {
        _id: false 
    }]
  },{
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

cartSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart(attrs);
};

const Cart = mongoose.model<CartDoc, CartModel>(
  "Cart",
  cartSchema
);

export { Cart };
