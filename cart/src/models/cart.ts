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
    garments: {
        garmentId: string,
        price: number,
        small: number,
        medium: number,
        large: number,
        xlarge: number,
        xxlarge: number
    }[]
}

const cartSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
    },
    garments: [{
        garmentId: String,
        price: Number,
        small: Number,
        medium: Number,
        large: Number,
        xlarge: Number,
        xxlarge: Number,
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
