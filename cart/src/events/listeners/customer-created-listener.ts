import { Listener, CustomerCreatedEvent, Subjects } from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Cart } from "../../models/cart";
import { queueGroupName } from "./queue-group-name";

export class CustomerCreatedListener extends Listener<CustomerCreatedEvent> {
    subject: Subjects.CustomerCreated = Subjects.CustomerCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: { customerId: string; }, msg: Message): Promise<void> {
        const cart = Cart.build({customerId: data.customerId});
        await cart.save();

        msg.ack();
    }
}
