import { Publisher, CustomerCreatedEvent, Subjects } from "@mfsvton/common";

export class CustomerCreatedPublisher extends Publisher<CustomerCreatedEvent> {
    subject: Subjects.CustomerCreated = Subjects.CustomerCreated;
}
