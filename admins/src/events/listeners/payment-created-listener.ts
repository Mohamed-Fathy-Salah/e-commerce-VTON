import {
  Listener,
  NotFoundError,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from '@mfsvton/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/orders';
import { queueGroupName } from './queue-group-name';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const orders = await Order.find({ orderId: data.orderId });

    if (!orders) {
      throw new NotFoundError();
    }

    orders.forEach(async (order) => {
      order.set({ status: OrderStatus.Completed });
      await order.save();
    });

    msg.ack();
  }
}
