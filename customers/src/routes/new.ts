import { requireCustomerAuth, validateRequest } from "@mfsvton/common";
import express, {Request, Response} from "express";
import {body} from 'express-validator';
import {Customer} from '../models/customer'

const router = express.Router();

router.post(
  "/api/customerdata",
  requireCustomerAuth,
  [
      body('name')
      .not()
      .isEmpty()
      .withMessage("name must be provided")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
      const body = req.body;
      // TODO: add all data
      
      const data = Customer.build({
          customerId: req.currentUser!.id,
          name: body.name
      });

      res.status(201).send(data);
  }
);

export { router as newCustomerDataRoute };
