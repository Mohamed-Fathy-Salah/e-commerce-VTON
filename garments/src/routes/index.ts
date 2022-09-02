import { NotFoundError } from "@mfsvton/common";
import express, { Response, Request } from "express";
import { Garment } from "../models/garment";

const router = express.Router();

router.get(
  "/api/garments/garment/:garmentId",
  async (req: Request, res: Response) => {
    const garment = await Garment.findById(req.params.garmentId);

    if(!garment) {
        throw new NotFoundError();
    }

    return res.status(200).send(garment);
  }
);

export { router as indexGarmentsRouter };
