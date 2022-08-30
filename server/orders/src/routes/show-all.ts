import { requireCustomerAuth } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders",
  requireCustomerAuth,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;

    const orders = await Order.find({ customerId });

    res.status(200).send(orders);
  }
);

export { router as showAllOrdersRouter };
