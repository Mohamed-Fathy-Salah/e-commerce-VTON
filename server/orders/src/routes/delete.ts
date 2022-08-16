import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireCustomerAuth,
} from "@mfsvton/common";
import express, { Request, Response } from "express";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { Order } from "../models/order";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireCustomerAuth,
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.customerId != req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    new OrderCancelledPublisher(natsWrapper.client).publish({
        orderId: order.id,
        customerId: order.customerId,
        garments: order.garments,
        version: order.version
    });

    res.status(200).send(order);
  }
);

export { router as deleteOrderRouter };
