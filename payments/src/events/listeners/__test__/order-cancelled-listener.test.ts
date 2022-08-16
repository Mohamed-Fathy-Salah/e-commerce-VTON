// todo
//import { OrderCancelledEvent, OrderStatus } from "@mfstickets/common";
//import mongoose from "mongoose";
//import { Message } from "node-nats-streaming";
//import { Order } from "../../../models/order";
//import { natsWrapper } from "../../../nats-wrapper";
//import { OrderCancelledListener } from "../order-cancelled-listener";

//const setup = async () => {
    //const listener = new OrderCancelledListener(natsWrapper.client);

    //const order = Order.build({
        //id: new mongoose.Types.ObjectId().toHexString(),
        //status: OrderStatus.Created,
        //price: 10,
        //userId: 'adfa',
        //version: 0
    //})
    //await order.save();

    //const data: OrderCancelledEvent['data'] = {
        //id: order.id,
        //version: order.version + 1,
        //ticket: {
            //id: "adfadsf"
        //}
    //}

    //// @ts-ignore
    //const msg: Message = {
        //ack: jest.fn()
    //}

    //return {listener, msg, order, data}
//}

//it('udates the status of the order', async () => {
    //const {listener, msg, order, data} = await setup();

    //await listener.onMessage(data, msg);

    //const updatedOrder = await Order.findById(order.id);

    //expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
//})

//it('acks the message', async () => {
    //const {listener, msg, order, data} = await setup();

    //await listener.onMessage(data, msg);

    //expect(msg.ack).toHaveBeenCalled();
//})
