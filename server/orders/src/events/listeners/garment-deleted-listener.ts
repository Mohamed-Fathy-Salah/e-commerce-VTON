import { Listener, GarmentDeletedEvent, Subjects, NotFoundError } from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Garments } from "../../models/garments";
import { queueGroupName } from "./queue-group-name";

export class GarmentDeletedListener extends Listener<GarmentDeletedEvent> {
  subject: Subjects.GarmentDeleted = Subjects.GarmentDeleted;
  queueGroupName = queueGroupName;
  async onMessage(data: GarmentDeletedEvent["data"], msg: Message): Promise<void> {
    const garment = await Garments.findById(data.garmentId);

    if(!garment) {
      throw new NotFoundError();
    }

    // todo: check if available changed and an order has that piece
    await garment.delete()

    msg.ack();
  }
}
