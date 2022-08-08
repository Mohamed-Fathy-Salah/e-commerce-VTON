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
    // todo: parallel ?
    for (const orderGarment of data.garments) {
      const garment = await Garment.findById(orderGarment.garmentId);

      if (!garment) {
        throw new NotFoundError();
      }

      const idx = garment.available.findIndex(
        (value) => value.size === orderGarment.size
      );

      if (idx === -1) {
        throw new NotFoundError();
      }

      if (garment.available[idx].quantity < orderGarment.quantity) {
        throw new BadRequestError(
          `garment ${garment.id} does not have enough pieces`
        );
      }

      garment.available[idx].quantity -= orderGarment.quantity;
      await garment.save();

      // todo: send all at once ?
      new GarmentUpdatedPublisher(natsWrapper.client).publish({
        garmentId: garment.id,
        adminId: garment.adminId,
        garmentClass: garment.garmentClass,
        gender: garment.gender,
        available: garment.available,
        price: garment.price,
        version: garment.version,
      });
    }

    msg.ack();
  }
}
