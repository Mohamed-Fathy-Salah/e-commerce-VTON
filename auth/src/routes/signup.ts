import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

enum UserType {
  Customer = "customer",
  Admin = "admin",
}

const validationRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      errors
        .array()
        .map((error) => {
          return JSON.stringify({ message: error.msg, field: error.param });
        })
        .toString()
    );
  }
  next();
};

let User: [{ email: string; password: string; type: UserType }];

router.post(
  "/api/user/signup",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage("pass must be between 5 & 15 chars"),
    body("type").isIn(Object.values(UserType)),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password, type } = req.body;

    //const user = User.push({ email, password, type });
    //console.log(user);

    res.status(201).send({ email, password, type });
  }
);

export { router as signupRouter };
