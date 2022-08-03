import {
  GarmentClass,
  GarmentSize,
  Gender,
  Measurements,
  SkinTone,
} from "@mfsvton/common";
import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
// TODO: make customerId the primary key and no need for _id
interface CustomerAttrs {
  customerId: string;
  name: string;
  gender?: Gender;
  age?: number;
  skinTone?: SkinTone;
  measurements?: Measurements;
  photo?: string; // TODO: add actual image
  sizePreferences?: [{ garmentClass: GarmentClass; garmentSize: GarmentSize }];
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
  gender?: Gender;
  age?: number;
  skinTone?: SkinTone;
  measurements?: Measurements;
  photo?: string; // TODO: add actual image
  sizePreferences?: [{ garmentClass: GarmentClass; garmentSize: GarmentSize }];
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
      default: Gender.Female, // TODO: add neutral
    },
    age: {
      type: Number,
    },
    skinTone: {
      type: String,
      enum: Object.values(SkinTone),
      default: SkinTone.MiddleEastern,
    },
    measurements: {
      height: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      chest: {
        type: Number,
      },
      waist: {
        type: Number,
      },
      hips: {
        type: Number,
      },
      arm: {
        type: Number,
      },
      inseam: {
        type: Number,
      },
      neckline: {
        type: Number,
      },
      shoulder: {
        type: Number,
      },
    },
    photo: {
      type: String, // todo: change
    },
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

customerSchema.statics.build = (attrs: CustomerAttrs) => {
  return new Customer(attrs);
};

const Customer = mongoose.model<CustomerDoc, CustomerModel>(
  "Customer",
  customerSchema
);

export { Customer };
