import {
  GarmentClass,
  Gender,
  NotFoundError,
  requireAdminAuth,
  validateRequest,
  GarmentSize,
} from "@mfsvton/common";
import express, { Response, Request } from "express";
import { body } from "express-validator";
import { GarmentUpdatedPublisher } from "../events/publishers/garment-updated-publisher";
import { Garment } from "../models/garment";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/garments/:garmentId",
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
    const adminId = req.currentUser!.id;
    const garmentId = req.params.garmentId;

    const garment = await Garment.findOne({ adminId, id: garmentId });

    if (!garment) {
      throw new NotFoundError();
    }

    const { garmentClass, gender, price, available } = req.body;

    garment.set({ garmentClass, gender, price, available });
    await garment.save();

    new GarmentUpdatedPublisher(natsWrapper.client).publish({
        garmentId: garment.id,
        adminId: garment.adminId,
        garmentClass: garment.garmentClass,
        gender: garment.gender,
        available: garment.available,
        price: garment.price,
        version: garment.version
    })

    res.status(201).send(garment);
  }
);

export { router as updateGarmentsRouter };
