import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Admin
interface AdminAttrs {
  adminId: string;
  name: string;
}

// An interface that describes the properties
// that a Admin Model has
interface AdminModel extends mongoose.Model<AdminDoc> {
  build(attrs: AdminAttrs): AdminDoc;
}

// An interface that describes the properties
// that a Admin Document has
interface AdminDoc extends mongoose.Document {
  adminId: string;
  name: string;
  photo: string;
}

const adminSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
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

adminSchema.statics.build = (attrs: AdminAttrs) => {
  return new Admin(attrs);
};

const Admin = mongoose.model<AdminDoc, AdminModel>("Admin", adminSchema);

export { Admin };
