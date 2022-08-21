import { Listener, NotFoundError, OrderCancelledEvent, Subjects} from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Garment } from "../../models/garment";
import { natsWrapper } from "../../nats-wrapper";
import { GarmentUpdatedPublisher } from "../publishers/garment-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        // todo: parallel ?
        for(const orderGarment of data.garments) {
            const garment = await Garment.findById(orderGarment.garmentId);

            if(!garment) {
                throw new NotFoundError();
            }

            // todo: fix
            //const idx = garment.available.findIndex((value) => value.size === orderGarment.size)

            //if(idx === -1) {
                //throw new NotFoundError();
            //}

            //garment.available[idx].quantity += orderGarment.quantity;
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
                xxlarge: garment.xxlarge
            })
        }
        
        msg.ack();
    }
}
