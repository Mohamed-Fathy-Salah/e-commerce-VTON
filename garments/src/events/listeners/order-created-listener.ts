import {
  BadRequestError,
  Listener,
  NotFoundError,
  OrderCreatedEvent,
  Subjects,
} from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Garment } from "../../models/garment";
import { natsWrapper } from "../../nats-wrapper";
import { GarmentUpdatedPublisher } from "../publishers/garment-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    for (const orderGarment of data.garments) {
      const garment = await Garment.findById(orderGarment.garmentId);

      if (!garment) {
        throw new NotFoundError();
      }

      garment.small -= orderGarment.small;
      garment.medium -= orderGarment.medium;
      garment.large -= orderGarment.large;
      garment.xlarge -= orderGarment.xlarge;
      garment.xxlarge -= orderGarment.xxlarge;

      if (
        garment.small < 0 ||
        garment.medium < 0 ||
        garment.large < 0 ||
        garment.xlarge < 0 ||
        garment.xxlarge < 0
      ) {
        throw new BadRequestError("not enough garments in stock");
      }

      await garment.save();

      new GarmentUpdatedPublisher(natsWrapper.client).publish({
        garmentId: garment.id,
        adminId: garment.adminId,
        garmentClass: garment.garmentClass,
        gender: garment.gender,
        price: garment.price,
        version: garment.version,
        small: garment.small,
        medium: garment.medium,
        large: garment.large,
        xlarge: garment.xlarge,
        xxlarge: garment.xxlarge,
      });
    }

    msg.ack();
  }
}
