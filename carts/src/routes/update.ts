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
  // todo: validate all
  [body("")],
  validateRequest,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;

    const cart = await Cart.findOne({ customerId });

    if (!cart) {
      throw new NotFoundError();
    }

    // todo: process garments

    res.status(201).send(cart);
  }
);

export { router as updateCartRouter };
