import express, { Response, Request } from "express";
import { Garment } from "../models/garment";

const router = express.Router();

router.get(
  "/api/garments/admin/:adminId",
  async (req: Request, res: Response) => {
      const garments = await Garment.find({adminId: req.params.adminId});

      return res.status(200).send(garments);
  }
);

export {router as showGarmentsRouter}
