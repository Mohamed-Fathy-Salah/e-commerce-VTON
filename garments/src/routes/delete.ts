import { NotAuthorizedError, NotFoundError, requireAdminAuth } from "@mfsvton/common";
import express, { Response, Request } from "express";
import { GarmentDeletedPublisher } from "../events/publishers/garment-deleted-publisher";
import { Garment } from "../models/garment";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/garments/:garmentId",
  requireAdminAuth,
  async (req: Request, res: Response) => {
    const adminId = req.currentUser!.id;
    const garmentId = req.params.garmentId;

    const garment = await Garment.findById(garmentId);


    if (!garment) {
      throw new NotFoundError();
    }

    if(garment.adminId !== adminId) {
        throw new NotAuthorizedError();
    }

    await garment.delete();

    new GarmentDeletedPublisher(natsWrapper.client).publish({
      garmentId,
      adminId: garment.adminId,
      version: garment.version,
    });

    return res.status(200).send(garment);
  }
);

export { router as deleteGarmentsRouter };
