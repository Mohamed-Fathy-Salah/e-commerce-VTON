import {
  Listener,
  NotFoundError,
  OrderCancelledEvent,
  Subjects,
  OrderStatus,
} from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Order, OrderDoc } from "../../models/orders";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const { customerId } = data;

    const saves = new Array<Promise<OrderDoc>>(data.garments.length);

    for (let idx in data.garments) {
      const { adminId, garmentId } = data.garments[idx];

      const order = await Order.findOne({ adminId, garmentId, customerId });

      if (!order) {
        throw new NotFoundError();
      }

      order.status = OrderStatus.Cancelled;

      saves[idx] = order.save();
    }

    await Promise.allSettled(saves);

    msg.ack();
  }
}
