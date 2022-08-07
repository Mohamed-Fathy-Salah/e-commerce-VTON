import { Gender, requireCustomerAuth, validateRequest } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Customer } from "../models/customer";

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
    const { customerId, name, age, gender} = req.body;

    const data = Customer.build({
      customerId,
      name,
      age, 
      gender
    });
    await data.save();

    res.status(201).send(data);
  }
);

export { router as newCustomerDataRoute };
