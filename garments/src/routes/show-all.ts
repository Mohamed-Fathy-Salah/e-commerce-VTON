import express, { Response, Request } from "express";
import { Garment } from "../models/garment";

const router = express.Router();

router.get(
  "/api/garments",
  async (req: Request, res: Response) => {
      const garments = await Garment.find();

      return res.status(200).send(garments);
  }
);

export {router as showAllGarmentsRouter}
