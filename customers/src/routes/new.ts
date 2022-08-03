import { requireCustomerAuth, validateRequest, Gender, SkinTone} from "@mfsvton/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Customer } from "../models/customer";

const router = express.Router();

router.post(
  "/api/customerdata",
  requireCustomerAuth,
  [
      // todo: add messages
    body("name").not().isEmpty(),
    body("gender").custom((value) => {
      return !value || Object.values(Gender).includes(value);
    }),
    body("age").custom((value) => {
      return !value || (value > 13 && value < 120);
    }),
    body("skinTone").custom((value) => {
      return !value || Object.values(SkinTone).includes(value);
    }),
    // todo: validate every field
    //body("measurements").custom((value) => { return !value || ;}),
    //body("photo").custom((value) => { return !value || ;}),
    //body("sizePreferences").custom((value) => { return !value || ;}),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const body = req.body;
    // TODO: add all data

    const data = Customer.build({
      customerId: req.currentUser!.id,
      name: body.name,
      age: body.age,
      skinTone: body.skinTone,
      gender: body.gender,
      measurements: body.measurements,
      //photo: body.photo,
      sizePreferences: body.sizePreferences
    });
    await data.save();

    res.status(201).send(data);
  }
);

export { router as newCustomerDataRoute };
