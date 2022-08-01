import { NotFoundError, requireCustomerAuth } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Customer } from "../models/customer";

const router = express.Router();

router.put(
  "/api/customerdata",
  requireCustomerAuth,
  async (req: Request, res: Response) => {
      const customerId = req.currentUser!.id;

      const customer = await Customer.findOne({customerId});

      if(!customer) {
          throw new NotFoundError();
      }

      // TODO: check if data is right
      customer.set(req.body);
      await customer.save();

      res.status(201).send(customer);
  }
);
export {router as updateCustomerDataRoute}
