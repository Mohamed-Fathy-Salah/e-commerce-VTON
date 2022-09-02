import {
  NotFoundError,
  requireCustomerAuth,
  validateRequest,
} from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart";
import { body } from "express-validator";

const router = express.Router();

router.put(
  "/api/cart",
  requireCustomerAuth,
  [
    body("garmentId").notEmpty(),
    body("price").isFloat({ gt: 0 }),
    body("small").isFloat({ gt: -1 }),
    body("medium").isFloat({ gt: -1 }),
    body("large").isFloat({ gt: -1 }),
    body("xlarge").isFloat({ gt: -1 }),
    body("xxlarge").isFloat({ gt: -1 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;

    const cart = await Cart.findOne({ customerId });

    if (!cart) {
      throw new NotFoundError();
    }

    const { garmentId, price, small, medium, large, xlarge, xxlarge} = req.body;

    const idx = cart.garments.findIndex((i) => i.garmentId === garmentId);

    if (idx === -1) {
      cart.garments.push(req.body);
    } else if (small + medium + large + xlarge + xxlarge === 0) {
      cart.garments.splice(idx, 1);
    } else {
      cart.garments[idx] = { garmentId, price, small, medium, large, xlarge, xxlarge};
    }
    await cart.save();

    res.status(201).send(cart);
  }
);

export { router as updateCartRouter };
