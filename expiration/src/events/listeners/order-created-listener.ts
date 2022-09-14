import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    console.log(`waiting for ${delay / 1000} seconds as delay`);

    await expirationQueue.add(
      {
        orderId: data.orderId,
      },
      {
        delay: delay,
      }
    );

    msg.ack();
  }
}
