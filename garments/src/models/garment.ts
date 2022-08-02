import { GarmentClass, GarmentSize, Gender } from "@mfsvton/common";
import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
// TODO: make adminId the primary key and no need for _id
interface GarmentAttrs {
  adminId: string;
  garmentClass: GarmentClass;
  gender: Gender;
  price: number;
  available: [
    {
      size: GarmentSize;
      quantity: number;
    }
  ];
}

// An interface that describes the properties
// that a User Model has
interface GarmentModel extends mongoose.Model<GarmentDoc> {
  build(attrs: GarmentAttrs): GarmentDoc;
}

// An interface that describes the properties
// that a User Document has
interface GarmentDoc extends mongoose.Document {
  adminId: string;
  garmentClass: GarmentClass;
  gender: Gender;
  price: number;
  available: [
    {
      size: GarmentSize;
      quantity: number;
    }
  ];
}

const garmentSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
    },
    garmentClass: {
      type: String,
      required: true,
      enum: Object.values(GarmentClass),
    },
    gender: {
      type: String,
      required: true,
      enum: Object.values(Gender),
      default: Gender.Neutral,
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: [
        {
          size: {
            type: String,
            required: true,
            enum: Object.values(GarmentSize),
          },
          quantity: {
              type: Number,
              required: true,
              default: 0
          }
        },
      ],
      required: true
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

garmentSchema.statics.build = (attrs: GarmentAttrs) => {
  return new Garment(attrs);
};

const Garment = mongoose.model<GarmentDoc, GarmentModel>(
  "Garment",
  garmentSchema
);

export { Garment };
