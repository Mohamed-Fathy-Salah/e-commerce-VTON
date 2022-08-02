import { requireAdminAuth } from "@mfsvton/common";
import express, { Response, Request } from "express";
import { Garment } from "../models/garment";

const router = express.Router();

router.get(
  "/api/garments",
  requireAdminAuth,
  async (req: Request, res: Response) => {
      const adminId = req.currentUser!.id;

      const garments = await Garment.find({adminId});

      return res.status(200).send(garments);
  }
);

export {router as showGarmentsRouter}
