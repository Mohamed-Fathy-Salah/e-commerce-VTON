import { requireCustomerAuth } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/orders",
  requireCustomerAuth,
  async (req: Request, res: Response) => {
  }
);

export { router as showAllOrdersRouter };
