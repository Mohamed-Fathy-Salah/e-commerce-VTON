import { Listener, GarmentCreatedEvent, Subjects } from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Garments } from "../../models/garments";
import { queueGroupName } from "./queue-group-name";

export class GarmentCreatedListener extends Listener<GarmentCreatedEvent> {
  subject: Subjects.GarmentCreated = Subjects.GarmentCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: GarmentCreatedEvent["data"], msg: Message): Promise<void> {
    console.log(data);
    
    
    const garment = Garments.build({
        garmentId: data.garmentId,
        garmentClass: data.garmentClass,
        gender: data.gender,
        price: data.price,
        small: data.small,
        medium: data.medium,
        large: data.medium,
        xlarge: data.xlarge,
        xxlarge: data.xxlarge,
        adminId: data.adminId
    })
    await garment.save();

    msg.ack();
  }
}
