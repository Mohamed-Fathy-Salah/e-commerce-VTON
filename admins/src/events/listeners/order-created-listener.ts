import { Listener, OrderCreatedEvent, Subjects } from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Order, OrderDoc } from "../../models/orders";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const {orderId, customerId, status, version} = data;

        const orders = new Array<Promise<OrderDoc>>(data.garments.length);

        for(let idx in data.garments) {
            const {adminId, garmentId, price, small, medium, large, xlarge, xxlarge} = data.garments[idx];

            const order = Order.build({
                orderId,
                adminId,
                customerId,
                garmentId,
                price,
                small,
                medium,
                large,
                xlarge,
                xxlarge,
                status,
                version
            });

            orders[idx] = order.save();
        }

        await Promise.allSettled(orders)

        msg.ack();
    }
}
