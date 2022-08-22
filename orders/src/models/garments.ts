import { GarmentClass, Gender } from "@mfsvton/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties
// that are requried to create a new User
interface GarmentsAttrs {
  id: string;
  garmentClass: GarmentClass;
  gender: Gender;
  small: number;
  medium: number;
  large: number;
  xlarge: number;
  xxlarge: number;
  price: number;
}

// An interface that describes the properties
// that a User Model has
interface GarmentsModel extends mongoose.Model<GarmentsDoc> {
  build(attrs: GarmentsAttrs): GarmentsDoc;
  findByEvent(event: {id: string, version: number}): Promise<GarmentsDoc|null>;
}

// An interface that describes the properties
// that a User Document has
interface GarmentsDoc extends mongoose.Document {
  garmentClass: GarmentClass;
  gender: Gender;
  small: number;
  medium: number;
  large: number;
  xlarge: number;
  xxlarge: number;
  price: number;
  version: number;
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
    small: Number,
    medium: Number,
    large: Number,
    xlarge: Number,
    xxlarge: Number,
    price: Number,
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

garmentsSchema.set('versionKey', 'version');
garmentsSchema.plugin(updateIfCurrentPlugin);

garmentsSchema.statics.build = (attrs: GarmentsAttrs) => {
  return new Garments({
      _id: attrs.id,
      garmentClass: attrs.garmentClass,
      gender: attrs.gender,
      small: attrs.small,
      medium: attrs.medium,
      large: attrs.large,
      xlarge: attrs.xlarge,
      xxlarge: attrs.xxlarge,
      price: attrs.price
  });
};

garmentsSchema.statics.findByEvent = (event: {id: string, version: number}) => {
    return Garments.findOne({
        _id: event.id,
        version: event.version - 1
    })
}

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
