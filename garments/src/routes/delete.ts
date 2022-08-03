import {
  NotFoundError,
  requireAdminAuth,
} from "@mfsvton/common";
import express, { Response, Request } from "express";
import { Garment } from "../models/garment";

const router = express.Router();

router.delete(
  "/api/garments/:garmentId",
  requireAdminAuth,
  async (req: Request, res: Response) => {
    const adminId = req.currentUser!.id;
    const garmentId = req.params.garmentId;

    const garment = await Garment.findOne({ adminId, id: garmentId });

    if (!garment) {
      throw new NotFoundError();
    }

    await garment.delete();

    return res.status(200).send(garment);
  }
);

export { router as deleteGarmentsRouter };
