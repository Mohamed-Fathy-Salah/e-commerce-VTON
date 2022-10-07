import { Listener, OrderCreatedEvent, Subjects} from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/orders";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], msg: Message): Promise<void> {
        const price = data.garments.reduce((acc, obj) => acc + obj.price * (obj.small + obj.medium + obj.large + obj.xlarge + obj.xxlarge), 0);

        const order = Order.build({
            id: data.orderId,
            customerId: data.customerId,
            price,
            status: data.status,
            version: data.version
        })
        await order.save();

        msg.ack();
    }
}
