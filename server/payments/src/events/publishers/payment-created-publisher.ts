import { Publisher, PaymentCreatedEvent, Subjects } from "@mfsvton/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    
}
