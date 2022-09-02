import { NotFoundError, requireCustomerAuth } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart";

const router = express.Router();

router.delete(
  "/api/cart/:garmentId",
  requireCustomerAuth,
  async (req: Request, res: Response) => {
    const garmentId = req.params.garmentId;
    const customerId = req.currentUser!.id;

    const cart = await Cart.findOne({ customerId });

    if (!cart) {
      throw new NotFoundError();
    }

    const idx = cart.garments.findIndex((i) => i.garmentId === garmentId);

    if (idx === -1) {
      throw new NotFoundError();
    }

    cart.garments.splice(idx, 1);

    await cart.save();

    res.status(200).send(cart);
  }
);

export { router as deleteCartRouter };
