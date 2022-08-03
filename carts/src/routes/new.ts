import { requireCustomerAuth } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart";

const router = express.Router();

router.post(
  "/api/cart",
  requireCustomerAuth,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;

    const cart = Cart.build({ customerId });

    res.status(201).send(cart);
  }
);

export { router as newCartRouter };
