import { Publisher, OrderCreatedEvent, Subjects } from "@mfsvton/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
