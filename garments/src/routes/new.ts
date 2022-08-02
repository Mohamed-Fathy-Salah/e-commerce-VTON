import { requireAdminAuth, validateRequest } from "@mfsvton/common";
import express, { Response, Request } from "express";
import { body } from "express-validator";
import { Garment } from "../models/garment";

const router = express.Router();

router.post(
  "/api/garments",
  requireAdminAuth,
  // TODO: validate all
  [body("")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { garmentClass, gender, price, available } = req.body;

    // TODO: process available
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
