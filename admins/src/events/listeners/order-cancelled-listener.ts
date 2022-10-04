import {
  Listener,
  NotFoundError,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from '@mfsvton/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/orders';
import { queueGroupName } from './queue-group-name';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const { orderId, customerId, garments } = data;

    const orders = await Order.find({ customerId, orderId });
    console.log(orders);

    const index: { [key: string]: { [key: string]: number } } = {};
    orders.forEach((order, idx) => {
      if (!index[order.adminId]) index[order.adminId] = {};
      index[order.adminId][order.garmentId] = idx;
    });

    garments.forEach(async ({ adminId, garmentId }) => {
      // find idx of [adminId, garmentId] in orders
      if (!index[adminId]) {
        throw new NotFoundError();
      }

      const idx = index[adminId][garmentId];
      // if not present throw not found error
      if (idx === -1) {
        throw new NotFoundError();
      }
      // update orders[idx].status = cancelled
      orders[idx].status = OrderStatus.Cancelled;
      await orders[idx].save();
    });

    msg.ack();
  }
}
