import {
  NotFoundError,
  requireAdminAuth,
  validateRequest,
} from "@mfsvton/common";
import express, { Response, Request } from "express";
import { body } from "express-validator";
import { Garment } from "../models/garment";

const router = express.Router();

router.put(
  "/api/garments/:garmentId",
  requireAdminAuth,
  // TODO: validate all
  [body("")],
  validateRequest,
  async (req: Request, res: Response) => {
    const adminId = req.currentUser!.id;
    const garmentId = req.params.garmentId;

    const garment = await Garment.findOne({ adminId, id: garmentId });

    if (!garment) {
      throw new NotFoundError();
    }

    const { garmentClass, gender, price, available } = req.body;

    // TODO: process available
    garment.set({ garmentClass, gender, price, available });
    await garment.save();

    res.status(201).send(garment);
  }
);

export { router as updateGarmentsRouter };
