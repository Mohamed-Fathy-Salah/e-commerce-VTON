import {
  GarmentClass,
  GarmentSize,
  Gender,
  OrderCancelledEvent,
} from "@mfsvton/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import {Garment } from "../../../models/garment";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const adminId = new mongoose.Types.ObjectId().toHexString();

  const garment = Garment.build({
    adminId,
    garmentClass: GarmentClass.Shirt,
    gender: Gender.Male,
    price: 20,
    available: [
      {
        size: GarmentSize.Small,
        quantity: 3,
      },
    ],
  });
  await garment.save();

  const data: OrderCancelledEvent["data"] = {
    orderId,
    customerId,
    garments: [
      {
        garmentId: garment.id,
        quantity: 2,
        size: GarmentSize.Small,
      },
    ],
    version: 0,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, garment, orderId, data, msg };
};
it("updates the ticket, publishes an event and acks the message", async () => {
  const { listener, garment, orderId, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedGarment = await Garment.findById(garment.id);

  // make sure garment quantity is updated
  expect(updatedGarment!.available[0].quantity).toEqual(2 + 3)

  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
