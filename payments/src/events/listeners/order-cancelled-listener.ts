import { Listener, NotFoundError, OrderCancelledEvent, OrderStatus, Subjects} from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/orders";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCancelledEvent['data'], msg: Message): Promise<void> {
        const order = await Order.findOne({
            _id: data.orderId,
            version: data.version - 1,
        })

        if(!order) {
            throw new NotFoundError();
        }

        order.set({status: OrderStatus.Cancelled})
        await order.save();

        msg.ack();
    }
}
