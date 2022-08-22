import {
  Listener,
  GarmentUpdatedEvent,
  Subjects,
  NotFoundError,
} from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Garments } from "../../models/garments";
import { queueGroupName } from "./queue-group-name";

export class GarmentUpdatedListener extends Listener<GarmentUpdatedEvent> {
  subject: Subjects.GarmentUpdated = Subjects.GarmentUpdated;
  queueGroupName = queueGroupName;
  async onMessage(
    data: GarmentUpdatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const garment = await Garments.findByEvent({
      id: data.garmentId,
      version: data.version,
    });

    if (!garment) {
      throw new NotFoundError();
    }

    // todo: check if available changed and an order has that piece
    garment.set({
      garmentClass: data.garmentClass,
      gender: data.gender,
      price: data.price,
      small: data.small,
      medium: data.medium,
      large: data.large,
      xlarge: data.xlarge,
      xxlarge: data.xxlarge,
    });
    await garment.save();

    msg.ack();
  }
}
