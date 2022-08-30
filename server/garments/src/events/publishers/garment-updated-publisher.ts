import {Publisher, GarmentUpdatedEvent, Subjects} from '@mfsvton/common';
export class GarmentUpdatedPublisher extends Publisher<GarmentUpdatedEvent> {
    subject: Subjects.GarmentUpdated = Subjects.GarmentUpdated;
}
