//todo
//import { OrderCreatedEvent, OrderStatus } from "@mfstickets/common";
//import mongoose from "mongoose";
//import { Order } from "../../../models/order";
//import { natsWrapper } from "../../../nats-wrapper";
//import { OrderCreatedListener } from "../order-created-listener";

//const setup = async () => {
  //const listener = new OrderCreatedListener(natsWrapper.client);

  //const data: OrderCreatedEvent["data"] = {
    //id: new mongoose.Types.ObjectId().toHexString(),
    //version: 0,
    //status: OrderStatus.Created,
    //userId: "adfadsf",
    //expiresAt: "asdfad",
    //ticket: {
      //id: "asdf",
      //price: 20,
    //},
  //};
  //// @ts-ignore
  //const msg: Message = {
    //ack: jest.fn(),
  //};

  //return { listener, data, msg };
//};

//it("replicates the order info", async () => {
  //const { listener, data, msg } = await setup();

  //await listener.onMessage(data, msg);

  //const order = await Order.findById(data.id);

  //expect(order!.price).toEqual(data.ticket.price);
//});

//it("replicates the order info", async () => {
  //const { listener, data, msg } = await setup();

  //await listener.onMessage(data, msg);

  //expect(msg.ack).toHaveBeenCalled();
//});
