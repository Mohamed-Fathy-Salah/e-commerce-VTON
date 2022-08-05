import { GarmentClass, GarmentSize, Gender } from "@mfsvton/common";
import mongoose from "mongoose";
import { Order } from "./order";

// An interface that describes the properties
// that are requried to create a new User
interface GarmentsAttrs {
  id: string;
  garmentClass: GarmentClass;
  gender: Gender;
  available: [
    {
      size: GarmentSize;
      quantity: number;
    }
  ];
  price: number;
}

// An interface that describes the properties
// that a User Model has
interface GarmentsModel extends mongoose.Model<GarmentsDoc> {
  build(attrs: GarmentsAttrs): GarmentsDoc;
}

// An interface that describes the properties
// that a User Document has
interface GarmentsDoc extends mongoose.Document {
  garmentClass: GarmentClass;
  gender: Gender;
  available: [
    {
      size: GarmentSize;
      quantity: number;
    }
  ];
  price: number;
  isReserved(): Promise<boolean>;
}

const garmentsSchema = new mongoose.Schema(
  {
    garmentClass: {
      type: String,
      enum: Object.values(GarmentClass),
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    available: [
      {
        size: {
          type: String,
          enum: Object.values(GarmentSize),
        },
        quantity: {
          type: Number,
        },
      },
      {
        _id: false,
      },
    ],
    price: {
      type: Number,
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

garmentsSchema.statics.build = (attrs: GarmentsAttrs) => {
  return new Garments({
      _id: attrs.id,
      garmentClass: attrs.garmentClass,
      gender: attrs.gender,
      available: attrs.available,
      price: attrs.price
  });
};

garmentsSchema.methods.isReserved = async function () {
    //TODO: implement

  //const existingOrder = await Order.findOne({

    //status: {
      //$in: [
        //OrderStatus.Created,
        //OrderStatus.AwaitingPayment,
        //OrderStatus.Complete,
      //],
    //},
  //});

  //return !!existingOrder;
  return true;
};


const Garments = mongoose.model<GarmentsDoc, GarmentsModel>(
  "Garments",
  garmentsSchema
);

export { Garments };
