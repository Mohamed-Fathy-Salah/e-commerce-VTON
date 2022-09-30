import { Listener, OrderCreatedEvent, Subjects } from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/orders";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { orderId, customerId, status, version, garments } = data;

    await Order.insertMany(
      garments.map((garment) => {
        return {
          orderId,
          customerId,
          status,
          version,
          ...garment,
        };
      })
    );

    msg.ack();
  }
}
