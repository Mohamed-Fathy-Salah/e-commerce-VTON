import { BadRequestError, requireCustomerAuth } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart";

const router = express.Router();

router.post(
  "/api/cart",
  requireCustomerAuth,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;

    const existingCart = await Cart.findOne({ customerId });
    
    if(existingCart) {
        throw new BadRequestError("cart already created");
    }

    const cart = Cart.build({ customerId });
    await cart.save()

    res.status(201).send(cart);
  }
);

export { router as newCartRouter };
