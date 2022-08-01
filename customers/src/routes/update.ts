import {
    Gender,
  NotFoundError,
  requireCustomerAuth,
  SkinTone,
  validateRequest,
} from "@mfsvton/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Customer } from "../models/customer";

const router = express.Router();

router.put(
  "/api/customerdata",
  requireCustomerAuth,
  [
      // todo: add messages
    body("name").custom((value) => {
      return !value || value.length > 0;
    }),
  body("gender").custom((value) => {return !value || Object.values(Gender).includes(value) }),
  body("age").custom((value) => { return !value || (value > 13 && value < 120);}),
  body("skinTone").custom((value) => { return !value || Object.values(SkinTone).includes(value);}),
  // todo: validate every field 
  //body("measurements").custom((value) => { return !value || ;}),
  //body("photo").custom((value) => { return !value || ;}),
  //body("sizePreferences").custom((value) => { return !value || ;}),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;

    const customer = await Customer.findOne({ customerId });

    if (!customer) {
      throw new NotFoundError();
    }

    // TODO: check if data is right
    customer.set(req.body);
    await customer.save();

    res.status(201).send(customer);
  }
);
export { router as updateCustomerDataRoute };
