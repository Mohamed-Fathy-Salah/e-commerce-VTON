import {
  GarmentClass,
  Gender,
  NotFoundError,
  requireAdminAuth,
  validateRequest,
} from "@mfsvton/common";
import express, { Response, Request } from "express";
import { body } from "express-validator";
import { GarmentUpdatedPublisher } from "../events/publishers/garment-updated-publisher";
import { Garment } from "../models/garment";
import { natsWrapper } from "../nats-wrapper";
import multer from 'multer';

const router = express.Router();

const Storage = multer.memoryStorage()

const upload = multer({ storage:Storage });

router.put(
  "/api/garments/:garmentId",
  requireAdminAuth,
  upload.fields([
      {name: 'frontPhoto', maxCount: 1},
      {name: 'backPhoto', maxCount: 1},
      {name: 'photos', maxCount: 4},
  ]),
  [
    body("garmentClass").custom((value) =>
      Object.values(GarmentClass).includes(value)
    ),
    body("price").isFloat({ gt: 0 }),
    body("small").isFloat({ gt: 0 }),
    body("medium").isFloat({ gt: 0 }),
    body("large").isFloat({ gt: 0 }),
    body("xlarge").isFloat({ gt: 0 }),
    body("xxlarge").isFloat({ gt: 0 }),
    body("gender").custom((value) => Object.values(Gender).includes(value)),
    //todo: handle what if more than 4 photos
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const adminId = req.currentUser!.id;
    const garmentId = req.params.garmentId;

    const garment = await Garment.findOne({ adminId, id: garmentId });

    if (!garment) {
      throw new NotFoundError();
    }

    const { garmentClass, gender, price, small, medium, large, xlarge, xxlarge} = req.body;
    
    //@ts-ignore
    const {frontPhoto, backPhoto, photos} = req.files;

    garment.set({ garmentClass, gender, price, small, medium, large, xlarge, xxlarge });

    if(frontPhoto) {
        //@ts-ignore
        garment.set({frontPhoto: frontPhoto[0].buffer.toString('base64')});
    }

    if(backPhoto) {
        //@ts-ignore
        garment.set({backPhoto: backPhoto[0].buffer.toString('base64')});
    }

    if(photos) {
        //@ts-ignore
        garment.set({photos: photos.map(val => val.buffer.toString('base64'))});
    }

    await garment.save();

    new GarmentUpdatedPublisher(natsWrapper.client).publish({
        garmentId: garment.id,
        adminId: garment.adminId,
        garmentClass: garment.garmentClass,
        gender: garment.gender,
        small: garment.small,
        medium: garment.medium,
        large: garment.large,
        xlarge: garment.xlarge,
        xxlarge: garment.xxlarge,
        price: garment.price,
        version: garment.version,
        frontPhoto: frontPhoto ? frontPhoto[0].buffer.toString('base64'): undefined, // send onlywhen new image
        backPhoto: backPhoto ? backPhoto[0].buffer.toString('base64'): undefined, // send onlywhen new image
    })

    res.status(201).send(garment);
  }
);

export { router as updateGarmentsRouter };
