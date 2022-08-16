import { Publisher, ExpirationCompletedEvent, Subjects } from "@mfsvton/common";

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
    subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;
}
