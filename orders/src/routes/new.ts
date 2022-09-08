import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireCustomerAuth,
  validateRequest,
} from "@mfsvton/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { Garments } from "../models/garments";
import { Order } from "../models/order";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 60;

router.post(
  "/api/orders",
  requireCustomerAuth,
  [
    body("garments").custom((value) => {
      return (
        value.length > 0 &&
        value.every(
          (garment: {
            price: number;
            small: number;
            medium: number;
            large: number;
            xlarge: number;
            xxlarge: number;
          }) => {
            return (
              garment.small + garment.medium + garment.large + garment.xlarge + garment.xxlarge > 0 && garment.price > 0
            );
          }
        )
      );
    }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const { garments } = req.body;

    // todo: search in the database
    const isReserved = async () => {
      for (let i = 0; i < garments.length; i++) {
        const garment = await Garments.findOne({garmentId: garments[i].garmentId});

        if (!garment || garment.adminId !== garments[i].adminId) {
          throw new NotFoundError();
        }

        return (
          garments[i].small > garment.small ||
          garments[i].medium > garment.medium ||
          garments[i].large > garment.large ||
          garments[i].xlarge > garment.xlarge ||
          garments[i].xxlarge > garment.xxlarge
        );
      }
    };

    if (await isReserved()) {
      // todo: specify what garment is not valid
      throw new BadRequestError("garment is already reserved");
    }

    const order = Order.build({
      customerId,
      garments,
      status: OrderStatus.Created,
      expiresAt: expiration,
    });
    await order.save();

    new OrderCreatedPublisher(natsWrapper.client).publish({
      orderId: order.id,
      customerId: order.customerId,
      garments: order.garments,
      status: order.status,
      expiresAt: order.expiresAt.toISOString(),
      version: order.version,
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
