import { NotFoundError, requireCustomerAuth } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart";

const router = express.Router();

router.delete(
  "/api/customerdata",
  requireCustomerAuth,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;

    const cart = await Cart.findOne({ customerId });

    if (!cart) {
      throw new NotFoundError();
    }

    cart.set({ garments: {} });
    await cart.save();

    res.status(200).send(cart);
  }
);

export { router as deleteCartRouter };
