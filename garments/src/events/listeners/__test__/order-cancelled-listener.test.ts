import { Listener, OrderCancelledEvent, Subjects} from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    onMessage(data: OrderCancelledEvent['data'], msg: Message): void {
        // todo
        msg.ack();
    }

}
