import { CustomerDataCreatedEvent, Publisher, Subjects } from "@mfsvton/common";

export class CustomerDataCreatedPublisher extends Publisher<CustomerDataCreatedEvent> {
    subject: Subjects.CustomerDataCreated = Subjects.CustomerDataCreated;
}
