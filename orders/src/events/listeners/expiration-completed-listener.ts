import {Listener, ExpirationCompletedEvent, Subjects, NotFoundError, OrderStatus} from "@mfsvton/common"
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { queueGroupName } from "./queue-group-name";

export class ExpirationCompletedListener extends Listener<ExpirationCompletedEvent> {
    subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;
    queueGroupName = queueGroupName;
    async onMessage(data: ExpirationCompletedEvent['data'], msg: Message): Promise<void> {
        const order = await Order.findById(data.orderId);

        if(!order) {
            throw new NotFoundError();
        }

        if(order.status === OrderStatus.Completed) {
            return msg.ack();
        }

        order.set({status: OrderStatus.Cancelled});
        await order.save();

        new OrderCancelledPublisher(this.client).publish({
            orderId: order.id,
            customerId: order.customerId,
            garments: order.garments,
            version: order.version
        });

        msg.ack();
    }
}
