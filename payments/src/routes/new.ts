import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireCustomerAuth, validateRequest } from "@mfsvton/common";
import express, {Request, Response} from "express";
import { body } from "express-validator";
import {stripe}from "../stripe";
import { Order } from "../models/orders";
import { Payment } from "../models/payments";
import { natsWrapper } from "../nats-wrapper";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import mongoose from "mongoose";

const router = express.Router();
router.post(
  "/api/payments",
  requireCustomerAuth,
  [body("token").not().isEmpty(), body("orderId").custom((value) => mongoose.Types.ObjectId.isValid(value))],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.customerId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("cannot pay for cancelled order");
    }

    const charge = await stripe.charges.create({
      currency: "usd",
      amount: order.price * 100,
      source: token,
    });

    const payment = Payment.build({
        orderId: order.id,
        stripeId: charge.id
    })
    await payment.save()

    await new PaymentCreatedPublisher(natsWrapper.client).publish({
        orderId: payment.orderId,
        stripeId: payment.stripeId
    });

    res.status(201).send({ id: payment.id });
  }
);

export { router as createChargeRouter };
