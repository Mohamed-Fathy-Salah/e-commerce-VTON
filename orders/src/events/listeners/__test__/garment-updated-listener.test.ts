import { GarmentClass, GarmentSize, GarmentUpdatedEvent, Gender } from "@mfsvton/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Garments } from "../../../models/garments";
import { natsWrapper } from "../../../nats-wrapper"
import { GarmentUpdatedListener } from "../garment-updated-listener";

const setup = async () => {
    //create a listener
   const listener = new GarmentUpdatedListener(natsWrapper.client);
   
    //create and save a ticket
    const garment = Garments.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        garmentClass: GarmentClass.Shirt,
        gender: Gender.Male,
        available: [{
            size: GarmentSize.Small,
            quantity: 3
        }, {
            size: GarmentSize.Small,
            quantity: 3
        }],
        price: 20
    })
    await garment.save();

    //create a fake data object
    const data: GarmentUpdatedEvent['data'] = {
        garmentId: garment.id,
        adminId: "adfadf",
        garmentClass: garment.garmentClass,
        gender: garment.gender,
        available: [{
            size: GarmentSize.Small,
            quantity: 2
        },{
            size: GarmentSize.Large,
            quantity: 10
        }],
        price: garment.price,
        version: garment.version + 1
    };

    //create a fake msg object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    //return all 
    return {listener, garment, data, msg};
}

it('finds, updates and saves a ticket', async () => {
    const {msg, data, garment, listener} = await setup(); 

    await listener.onMessage(data, msg);

    const updatedGarment = await Garments.findById(garment.id);

    expect(updatedGarment!.available.length).toEqual(data.available.length);
    expect(updatedGarment!.available[0].quantity).toEqual(data.available[0].quantity);
    expect(updatedGarment!.available[1].quantity).toEqual(data.available[1].quantity);
    expect(updatedGarment!.version).toEqual(data.version);
})

it('acks the message', async () => {
    const {msg, data, garment, listener} = await setup(); 

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
})

it('does not call ack if the event has a skipped version number', async () => {
    const {msg, data, listener, garment} = await setup();

    data.version = 10;

    try{
        await listener.onMessage(data, msg);
    }catch(err){ console.log('error') }

    expect(msg.ack).not.toHaveBeenCalled();
})
