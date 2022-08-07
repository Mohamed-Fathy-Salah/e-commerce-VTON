import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { CustomerCreatedListener } from "../customer-created-listener";
import { CustomerCreatedEvent, Gender } from "@mfsvton/common";
import { Cart } from "../../../models/cart";

const setup = async () => {
  // create an instnace of the listener
  const listener = new CustomerCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: CustomerCreatedEvent["data"] = {
      customerId: new mongoose.Types.ObjectId().toHexString(),
      name: "blah",
      age: 15,
      gender: Gender.Male
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("creates, saves a ticket and acks msg", async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage  func with the data, message objects
  await listener.onMessage(data, msg);

  // write assertions to make sure a ticket was created
  // todo: change to findbyid
  const cart = await Cart.findOne({customerId: data.customerId});

  expect(cart).toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
});
