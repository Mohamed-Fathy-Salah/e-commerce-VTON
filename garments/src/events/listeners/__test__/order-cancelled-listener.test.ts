import {
  GarmentClass,
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
      name: 'blah',
      description: 'blah',
      garmentClass: GarmentClass.Shirt,
      gender: Gender.Male,
      price: 20,
      small: 2,
      medium: 2,
      large: 2,
      xlarge: 2,
      xxlarge: 2,
      frontPhoto: "blah",
      backPhoto: "blah",
  });
  await garment.save();

  const data: OrderCancelledEvent["data"] = {
    orderId,
    customerId,
    garments: [
      {
        garmentId: garment.id,
      small: 4,
      medium: 0,
      large: 1,
      xlarge: 0,
      xxlarge: 3,
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
  expect(updatedGarment!.small).toEqual(data.garments[0].small + garment.small)
  expect(updatedGarment!.medium).toEqual(data.garments[0].medium + garment.medium)
  expect(updatedGarment!.large).toEqual(data.garments[0].large + garment.large)
  expect(updatedGarment!.xlarge).toEqual(data.garments[0].xlarge + garment.xlarge)
  expect(updatedGarment!.xxlarge).toEqual(data.garments[0].xxlarge + garment.xxlarge)

  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
