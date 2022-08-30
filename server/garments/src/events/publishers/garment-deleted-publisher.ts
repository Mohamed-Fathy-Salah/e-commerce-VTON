import {Publisher, GarmentDeletedEvent, Subjects} from '@mfsvton/common';
export class GarmentDeletedPublisher extends Publisher<GarmentDeletedEvent> {
    subject: Subjects.GarmentDeleted = Subjects.GarmentDeleted;
}
