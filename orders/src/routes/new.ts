import {
  BadRequestError,
  GarmentSize,
  OrderStatus,
  requireCustomerAuth,
  validateRequest,
} from "@mfsvton/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Garments } from "../models/garments";
import { Order } from "../models/order";

const router = express.Router();

// body = {garments:[{garmentId:string, quantity: number, price: number, size:
// (sml..)}]}
const EXPIRATION_WINDOW_SECONDS = 60;

router.post(
  "/api/orders",
  requireCustomerAuth,
  //todo: validate
  [body("")],
  validateRequest,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const { garments } = req.body;

    // todo: make sure it is reserved before creating order
    const isReserved = garments.every(
      async (stockedGarment: {
        garmentId: string;
        quantity: number;
        price: number;
        size: GarmentSize;
      }) => {
        const garment = await Garments.findById(stockedGarment.garmentId);

        if (!garment) {
          return false;
        }

        const idx = garment.available.findIndex(
          (val) => val.size === stockedGarment.size
        );

        return (
          idx !== -1 &&
          garment.available[idx].quantity >= stockedGarment.quantity
        );
      }
    );

    if (isReserved) {
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

    // todo : publish order created

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
