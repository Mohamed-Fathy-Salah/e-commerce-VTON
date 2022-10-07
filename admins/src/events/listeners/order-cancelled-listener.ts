import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/orders";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const { orderId } = data;

    await Order.updateMany({ orderId }, { status: OrderStatus.Cancelled });

    msg.ack();
  }
}
