import { Gender, requireCustomerAuth, validateRequest } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { CustomerDataCreatedPublisher } from "../events/publishers/customer-data-created-publisher";
import { Customer } from "../models/customer";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/customerdata",
  requireCustomerAuth,
  [
    body("customerId").custom((value) =>
      mongoose.Types.ObjectId.isValid(value)
    ),
    body("name").not().isEmpty(),
    body("age").isFloat({ gt: 13, lt: 120 }),
    body("gender").custom((value) => Object.values(Gender).includes(value)),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { customerId, name, age, gender } = req.body;

    const customer = Customer.build({
      customerId,
      name,
      age,
      gender,
    });
    await customer.save();

    new CustomerDataCreatedPublisher(natsWrapper.client).publish({
      customerId,
      name,
      age,
      gender,
      version: customer.version,
    });

    res.status(201).send(customer);
  }
);

export { router as newCustomerDataRoute };
