import {
  GarmentClass,
  GarmentSize,
  Gender,
  Measurements,
  SkinTone,
} from "@mfsvton/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties
// that are requried to create a new User
interface CustomerAttrs {
  customerId: string;
  name: string;
  gender: Gender;
  age: number;
}

// An interface that describes the properties
// that a User Model has
interface CustomerModel extends mongoose.Model<CustomerDoc> {
  build(attrs: CustomerAttrs): CustomerDoc;
}

// An interface that describes the properties
// that a User Document has
interface CustomerDoc extends mongoose.Document {
  customerId: string;
  name: string;
  gender: Gender;
  age: number;
  skinTone?: SkinTone;
  measurements?: Measurements;
  photo?: string,
  sizePreferences?: [{ garmentClass: GarmentClass; garmentSize: GarmentSize }];
  version: number;
}

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.Neutral, 
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    skinTone: {
      type: String,
      enum: Object.values(SkinTone),
      default: SkinTone.MiddleEastern,
    },
    measurements: {
      height: Number,
      weight: Number,
      chest: Number,
      waist: Number,
      hips: Number,
      arm: Number,
      inseam: Number,
      neckline: Number,
      shoulder: Number,
    },
    photo: String,
    sizePreferences: [
      {
        garmentClass: {
          type: String,
          enum: Object.values(GarmentClass),
        },
        garmentSize: {
          type: String,
          enum: Object.values(GarmentSize),
        },
      }, {
        _id: false
      }
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

customerSchema.set('versionKey', 'version');
customerSchema.plugin(updateIfCurrentPlugin);

customerSchema.statics.build = (attrs: CustomerAttrs) => {
  return new Customer(attrs);
};

const Customer = mongoose.model<CustomerDoc, CustomerModel>(
  "Customer",
  customerSchema
);

export { Customer };
