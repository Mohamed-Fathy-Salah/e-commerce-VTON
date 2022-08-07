import { BadRequestError, UserType, validateRequest } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { CustomerCreatedPublisher } from "../events/publishers/customer-created-publisher";
import { User } from "../models/user";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage("pass must be between 5 & 15 chars"),
    body("type").isIn(Object.values(UserType)),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, type } = req.body;

    const existingUser = await User.findOne({ email, type });

    if (existingUser) {
      throw new BadRequestError("email is used");
    }

    const user = User.build({ email, password, type });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        type: user.type,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    if (user.type === UserType.Customer) {
      new CustomerCreatedPublisher(natsWrapper.client).publish({ customerId: user.id });
    }

    res.status(201).send({ email, password, type });
  }
);

export { router as signupRouter };
