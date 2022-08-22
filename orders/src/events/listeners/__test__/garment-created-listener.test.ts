import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { GarmentCreatedListener } from "../garment-created-listener";
import {
  GarmentClass,
  GarmentCreatedEvent,
  Gender,
} from "@mfsvton/common";
import { Garments } from "../../../models/garments";

const setup = async () => {
  // create an instnace of the listener
  const listener = new GarmentCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: GarmentCreatedEvent["data"] = {
      garmentId: new mongoose.Types.ObjectId().toHexString(),
      adminId: new mongoose.Types.ObjectId().toHexString(),
      garmentClass: GarmentClass.Shirt,
      gender: Gender.Male,
      small: 2,
      medium: 2,
      large: 2,
      xlarge: 2,
      xxlarge: 2,
      price: 20,
      version: 0,
      frontPhoto: "blah",
      backPhoto: "blah"
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("creates , saves a garment, ack msg", async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage  func with the data, message objects
  await listener.onMessage(data, msg);

  // write assertions to make sure a ticket was created
  const garment = await Garments.findById(data.garmentId);

  expect(garment).toBeDefined();
  expect(garment!.price).toEqual(data.price);
  expect(garment!.gender).toEqual(data.gender);
  expect(garment!.garmentClass).toEqual(data.garmentClass);
  expect(garment!.small).toEqual(data.small);
  expect(garment!.medium).toEqual(data.medium);
  expect(garment!.large).toEqual(data.large);
  expect(garment!.xlarge).toEqual(data.xlarge);
  expect(garment!.xxlarge).toEqual(data.xxlarge);

  expect(msg.ack).toHaveBeenCalled();
});
