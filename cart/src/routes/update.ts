import {
    GarmentSize,
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
    body("garmentId")
    .not()
    .isEmpty(),
    body("price")
    .isFloat({ gt: 0}),
    body("quantity")
    .isFloat({ gt: -1}),
    body("size")
    .custom((value) => Object.values(GarmentSize).includes(value))
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;

    const cart = await Cart.findOne({ customerId });

    if (!cart) {
      throw new NotFoundError();
    }

    const {garmentId, price, quantity, size} = req.body;

    const idx = cart.garments.findIndex(i => i.garmentId === garmentId)
    
    if (idx === -1) {
        cart.garments.push(req.body)
    } else if(quantity === 0) {
        cart.garments.splice(idx, 1);
    } else {
        cart.garments[idx] = {garmentId, price, quantity, size} 
    }
    await cart.save();

    res.status(201).send(cart);
  }
);

export { router as updateCartRouter };
