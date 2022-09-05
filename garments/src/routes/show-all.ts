import express, { Response, Request } from "express";
import { Garment } from "../models/garment";
import cookieParser from "cookie-parser";

const router = express.Router();

router.get(
  "/api/garments",
  cookieParser(),
  async (req: Request, res: Response) => {
    const useCart = req.query.cart || "0";

    if (useCart === "0") {
      const garments = await Garment.find();
      return res.status(200).send(garments);
    }

    const encodedCart = req.cookies.cart;

    if (!encodedCart) {
      return res.status(200).send([]);
    }

    const cart = JSON.parse(Buffer.from(encodedCart, 'base64').toString('ascii'));

    const garments = cart.map(async (value: {garmentId: string}) => await Garment.findById(value.garmentId))

    res.status(200).send(garments)
});

export { router as showAllGarmentsRouter };
