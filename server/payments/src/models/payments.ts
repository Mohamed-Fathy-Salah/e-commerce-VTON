import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
interface PaymentAttrs {
    orderId: string;
    stripeId: string;
}

// An interface that describes the properties
// that a User Model has
interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

// An interface that describes the properties
// that a User Document has
interface PaymentDoc extends mongoose.Document {
    orderId: string;
    stripeId: string;
}

const orderSchema = new mongoose.Schema(
  {
      orderId: {
          type: String,
          required: true,
      },
      stripeId: {
          type: String,
          required: true
      }
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

orderSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>("Payment", orderSchema);

export { Payment };
