import {
  GarmentClass,
  GarmentSize,
  Gender,
  requireAdminAuth,
  validateRequest,
} from "@mfsvton/common";
import express, { Response, Request } from "express";
import { body } from "express-validator";
import { Garment } from "../models/garment";

const router = express.Router();

router.post(
  "/api/garments",
  requireAdminAuth,
  [
    body("garmentClass").custom((value) =>
      Object.values(GarmentClass).includes(value)
    ),
    body("gender").custom((value) => Object.values(Gender).includes(value)),
    body("price").isFloat({ gt: 0 }),
    body("available").custom((value) =>
      value.every(
        (garment: { size: GarmentSize; quantity: number }) =>
          Object.values(GarmentSize).includes(garment.size) &&
          garment.quantity >= 0
      )
    ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { garmentClass, gender, price, available } = req.body;

    const garment = Garment.build({
      adminId: req.currentUser!.id,
      garmentClass,
      gender,
      price,
      available,
    });
    await garment.save();

    res.status(201).send(garment);
  }
);

export { router as newGarmentsRouter };
