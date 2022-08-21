import { GarmentClass, GarmentSize, Gender } from "@mfsvton/common";
import mongoose from "mongoose";
import {updateIfCurrentPlugin} from 'mongoose-update-if-current'

// An interface that describes the properties
// that are requried to create a new User
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
  frontPhoto: string;
  backPhoto: string;
  photos?: string[];
}

// An interface that describes the properties
// that a User Model has
interface GarmentModel extends mongoose.Model<GarmentDoc> {
  build(attrs: GarmentAttrs): GarmentDoc;
}

// An interface that describes the properties
// that a User Document has
export interface GarmentDoc extends mongoose.Document {
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
  frontPhoto: string;
  backPhoto: string;
  photos?: string[];
  version: number;
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
        }, {
            _id: false
        }
      ],
      required: true
    },
    frontPhoto:{
        type: String,
        required: true
    },
    backPhoto: {
        type: String,
        required: true
    },
    photos: [String]
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

garmentSchema.set('versionKey', 'version');
garmentSchema.plugin(updateIfCurrentPlugin);

garmentSchema.statics.build = (attrs: GarmentAttrs) => {
  return new Garment(attrs);
};

const Garment = mongoose.model<GarmentDoc, GarmentModel>(
  "Garment",
  garmentSchema
);

export { Garment };
