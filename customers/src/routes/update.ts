import {
    Gender,
  NotFoundError,
  requireCustomerAuth,
  SkinTone,
  validateRequest,
} from "@mfsvton/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { CustomerDataUpdatedPublisher } from "../events/publishers/customer-data-updated-publisher";
import { Customer } from "../models/customer";
import { natsWrapper } from "../nats-wrapper";
import multer from 'multer';

const router = express.Router();

const Storage = multer.memoryStorage()

const upload = multer({ storage:Storage });

router.put(
  "/api/customerdata",
  upload.single('file'),
  requireCustomerAuth,
  [
      // todo: add messages
    body("name").custom((value) => {
      return value.length > 0;
    }),
  body("gender").custom(value => {
      console.log(value);
      return Object.values(Gender).includes(value)
  }),
  body("age").custom(value => value > 13 && value < 120),
  body("skinTone").custom(value => Object.values(SkinTone).includes(value)),
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

    customer.set({name: req.body.name || customer.name});
    customer.set({gender: req.body.gender || customer.gender});
    customer.set({age: req.body.age || customer.age});
    customer.set({skinTone: req.body.skinTone || customer.skinTone});
    customer.set({measurements: req.body.measurements});
    customer.set({sizePreferences: req.body.sizePreferences});
    if(req.file) {
        console.log("photo updated")
        customer.set({photo:{
            data: req.file.buffer,
            contentType: "image/png"
        }});
    }

    await customer.save();

    // todo: put each item 
    new CustomerDataUpdatedPublisher(natsWrapper.client).publish(req.body);

    res.status(201).send(customer);
  }
);
export { router as updateCustomerDataRoute };
