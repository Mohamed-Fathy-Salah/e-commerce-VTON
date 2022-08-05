import {
  BadRequestError,
  GarmentSize,
  NotFoundError,
  OrderStatus,
  requireCustomerAuth,
  validateRequest,
} from "@mfsvton/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Garments } from "../models/garments";
import { Order } from "../models/order";

const router = express.Router();

// body = {garments:[{garmentId:string, quantity: number, price: number, size:
// (sml..)}]}
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
            garmentId: string;
            quantity: number;
            price: number;
            size: GarmentSize;
          }) => {
            return (
              mongoose.Types.ObjectId.isValid(garment.garmentId) &&
              garment.quantity >= 0 &&
              garment.price > 0 &&
              Object.values(GarmentSize).includes(garment.size)
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

    const isReserved = async () => {
      for (let i = 0; i < garments.length; i++) {
        const garment = await Garments.findById(garments[i].garmentId);

        if (!garment) {
          throw new NotFoundError();
        }

        const idx = garment.available.findIndex(
          (val) => val.size === garments[i].size
        );

        if (
          idx === -1 ||
          garment.available[idx].quantity < garments[i].quantity
        ) {
          return true;
        }
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

    // todo : publish order created

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
