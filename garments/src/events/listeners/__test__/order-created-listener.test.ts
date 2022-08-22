import {
  GarmentClass,
  Gender,
  OrderCreatedEvent,
  OrderStatus,
} from "@mfsvton/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Garment } from "../../../models/garment";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const adminId = new mongoose.Types.ObjectId().toHexString();

  const garment = Garment.build({
    adminId,
    garmentClass: GarmentClass.Shirt,
    gender: Gender.Male,
    price: 20,
    small: 3,
    medium: 3,
    large: 2,
    xlarge: 1,
    xxlarge: 0,
    frontPhoto: "blah",
    backPhoto: "blah",
  });
  await garment.save();

  const data: OrderCreatedEvent["data"] = {
    orderId,
    customerId,
    version: 0,
    garments: [
      {
        garmentId: garment.id,
        price: garment.price,
        small: 2,
        medium: 1,
        large: 2,
        xlarge: 0,
        xxlarge: 0,
      },
    ],
    status: OrderStatus.Created,
    expiresAt: "adsfasjdkf",
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, garment, orderId, data, msg };
};

it("error when order too much", async () => {
  const { listener, garment, orderId, data, msg } = await setup();

  data.garments[0].small = 10;

  try {
      await listener.onMessage(data, msg);
  }catch(err) {console.log(err);}

  const updatedGarment = await Garment.findById(garment.id);

  // make sure garment quantity is updated
  expect(updatedGarment!.small).toEqual(garment.small);
  expect(updatedGarment!.medium).toEqual(garment.medium);
  expect(updatedGarment!.large).toEqual(garment.large);
  expect(updatedGarment!.xlarge).toEqual(garment.xlarge);
  expect(updatedGarment!.xxlarge).toEqual(garment.xxlarge);

  expect(msg.ack).not.toHaveBeenCalled();
  expect(natsWrapper.client.publish).not.toHaveBeenCalled();
});

it("updates the ticket, publishes an event and acks the message", async () => {
  const { listener, garment, orderId, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedGarment = await Garment.findById(garment.id);

  // make sure garment quantity is updated
  expect(updatedGarment!.small).toEqual(garment.small - data.garments[0].small);
  expect(updatedGarment!.medium).toEqual(garment.medium - data.garments[0].medium);
  expect(updatedGarment!.large).toEqual(garment.large - data.garments[0].large);
  expect(updatedGarment!.xlarge).toEqual(garment.xlarge - data.garments[0].xlarge);
  expect(updatedGarment!.xxlarge).toEqual(garment.xxlarge - data.garments[0].xxlarge);

  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
