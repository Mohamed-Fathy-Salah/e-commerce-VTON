import { GarmentClass, GarmentDeletedEvent, Gender } from "@mfsvton/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Garments } from "../../../models/garments";
import { natsWrapper } from "../../../nats-wrapper";
import { GarmentDeletedListener } from "../garment-deleted-listener";

const setup = async () => {
  //create a listener
  const listener = new GarmentDeletedListener(natsWrapper.client);

  //create and save a ticket
  const garment = Garments.build({
      garmentId: new mongoose.Types.ObjectId().toHexString(),
      garmentClass: GarmentClass.Shirt,
      gender: Gender.Male,
      small: 2,
      medium: 2,
      large: 2,
      xlarge: 2,
      xxlarge: 2,
      price: 20,
      adminId: "adf"
  });
  await garment.save();

  //create a fake data object
  const data: GarmentDeletedEvent["data"] = {
      garmentId: garment.garmentId,
      adminId: "adfadf",
      version: garment.version + 1
  };

  //create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  //return all
  return { listener, garment, data, msg };
};

it("finds, updates and saves a ticket", async () => {
  const { msg, data, garment, listener } = await setup();

  await listener.onMessage(data, msg);

  const deletedGarment = await Garments.findById(garment.id);

  expect(deletedGarment).toEqual(null);
});

it("acks the message", async () => {
  const { msg, data, garment, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
    const {msg, data, listener, garment} = await setup();

    data.version = 10;

    try{
        await listener.onMessage(data, msg);
    }catch(err){ console.log('error') }

    expect(msg.ack).not.toHaveBeenCalled();
})
