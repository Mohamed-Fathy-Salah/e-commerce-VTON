import {Publisher, GarmentCreatedEvent, Subjects} from '@mfsvton/common';
export class GarmentCreatedPublisher extends Publisher<GarmentCreatedEvent> {
    subject: Subjects.GarmentCreated = Subjects.GarmentCreated;
}
