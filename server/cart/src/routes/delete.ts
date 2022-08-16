import { NotFoundError, requireCustomerAuth } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Cart} from "../models/cart";

const router = express.Router();

router.delete(
  "/api/cart",
  requireCustomerAuth,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;

    const cart = await Cart.findOne({ customerId });

    if (!cart) {
      throw new NotFoundError();
    }

    // @ts-ignore
    cart.garments = [];
    await cart.save();

    res.status(200).send(cart);
  }
);

export { router as deleteCartRouter };
