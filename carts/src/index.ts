import { BadRequestError } from "@mfsvton/common";
import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new BadRequestError("JWT_KEY is not defined");
  }

  if (!process.env.MONGO_URI) {
    throw new BadRequestError("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("connected to mongodb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
