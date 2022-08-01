import { NotFoundError, requireCustomerAuth } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Customer } from "../models/customer";

const router = express.Router();

router.get(
  "/api/customerdata",
  requireCustomerAuth,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;

    const customer = await Customer.findOne({ customerId });

    if (!customer) {
      throw new NotFoundError();
    }

    res.status(200).send(customer);
  }
);

export { router as showCustomerDataRoute };
