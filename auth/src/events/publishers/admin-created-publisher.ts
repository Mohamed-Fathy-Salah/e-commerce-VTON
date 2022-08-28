import { Publisher, AdminCreatedEvent, Subjects } from "@mfsvton/common";

export class AdminCreatedPublisher extends Publisher<AdminCreatedEvent> {
    subject: Subjects.AdminCreated = Subjects.AdminCreated;
}
