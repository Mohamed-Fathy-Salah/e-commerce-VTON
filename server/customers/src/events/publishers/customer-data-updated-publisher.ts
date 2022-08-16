import { Publisher, CustomerDataUpdatedEvent, Subjects } from "@mfsvton/common";

export class CustomerDataUpdatedPublisher extends Publisher<CustomerDataUpdatedEvent> {
    subject: Subjects.CustomerDataUpdated = Subjects.CustomerDataUpdated;
}
