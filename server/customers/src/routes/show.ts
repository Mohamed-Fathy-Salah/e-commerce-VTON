import { NotFoundError, requireCustomerAuth, UserType } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Customer } from "../models/customer";

const router = express.Router();

router.get(
  "/api/customerdata/:customerId",
  async (req: Request, res: Response) => {
    const userId = req.params.customerId;

    const customer = await Customer.findOne({ userId });

    if (!customer) {
      throw new NotFoundError();
    }

    if (
      req.currentUser &&
      req.currentUser.id === userId &&
      req.currentUser.type === UserType.Customer
    ) {
      return res.status(200).send(customer);
    }

    // todo: make user select what is sensitive and what is not
    // remove sensitive data
    delete customer.measurements;

    res.status(200).send(customer);
  }
);

export { router as showCustomerDataRoute };
