import {
  BadRequestError,
  Gender,
  UserType,
  validateRequest,
} from "@mfsvton/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { CustomerCreatedPublisher } from "../events/publishers/customer-created-publisher";
import { AdminCreatedPublisher } from "../events/publishers/admin-created-publisher";
import { User } from "../models/user";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("name").not().isEmpty().withMessage("name must be valid"),
    //body("age").isFloat({ gt: 13, lt: 120 }),
    //body("gender").custom((value) => Object.values(Gender).includes(value)),
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage("pass must be between 5 & 15 chars"),
    //body("type").isIn(Object.values(UserType)),
    body("type").custom((value, { req }) => {
      if (value === UserType.Customer) {
        return (
          req.body.age &&
          req.body.age > 13 &&
          req.body.age < 120 &&
          Object.values(Gender).includes(req.body.gender)
        );
      }
      return value === UserType.Admin;
    }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, type, password, name } = req.body;

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
      const { age, gender } = req.body;

      new CustomerCreatedPublisher(natsWrapper.client).publish({
        customerId: user.id,
        name,
        age,
        gender,
      });

      return res.status(201).send({ name, age, gender, email, password, type });
    }

    // otherwise user is admin
    new AdminCreatedPublisher(natsWrapper.client).publish({
        adminId: user.id,
        name
    })
    
    return res.status(201).send({ name, email, password, type });
  }
);

export { router as signupRouter };
