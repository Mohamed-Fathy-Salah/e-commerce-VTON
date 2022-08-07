import { BadRequestError } from "@mfsvton/common";
import { app } from "./app";
import mongoose from "mongoose";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { natsWrapper } from "./nats-wrapper";

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

  natsWrapper.client.on("close", () => {
    console.log("nats connection closed");
    process.exit();
  });
  process.on("SIGINT", () => natsWrapper.client.close());
  process.on("SIGTERM", () => natsWrapper.client.close());

  new OrderCreatedListener(natsWrapper.client).listen();
  new OrderCancelledListener(natsWrapper.client).listen();

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
