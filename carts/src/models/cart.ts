import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
// TODO: make customerId the primary key and no need for _id
interface CartAttrs {
    customerId: string;
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
interface CartDoc extends mongoose.Document {
    customerId: string;
    garments: [{
        garmentId: string,
        quantity: number,
        price: number
    }]
}

const customerSchema = new mongoose.Schema(
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
        }
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

customerSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart(attrs);
};

const Cart = mongoose.model<CartDoc, CartModel>(
  "Cart",
  customerSchema
);

export { Cart };
