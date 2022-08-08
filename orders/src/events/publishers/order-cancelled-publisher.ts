import { Publisher, OrderCancelledEvent, Subjects } from "@mfsvton/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
