import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
interface CartAttrs {
    garments: [{
        garmentId: string,
        quantity: number,
        price: number
    }]
}

// An interface that describes the properties
// that a User Model has
interface CartModel extends mongoose.Model<CartDoc> {
  build(attrs: CartAttrs): CartDoc;
}

// An interface that describes the properties
// that a User Document has
export interface CartDoc extends mongoose.Document {
    garments: [{
        garmentId: string,
        quantity: number,
        price: number
    }]
}

const cartSchema = new mongoose.Schema(
  {
    garments: [{
        garmentId: {
            type: String,
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number
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
