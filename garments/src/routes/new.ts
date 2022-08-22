import {
  GarmentClass,
  Gender,
  requireAdminAuth,
  validateRequest,
} from "@mfsvton/common";
import express, { Response, Request} from "express";
import { body, check } from "express-validator";
import { GarmentCreatedPublisher } from "../events/publishers/garment-created-publisher";
import { Garment } from "../models/garment";
import { natsWrapper } from "../nats-wrapper";
import multer from 'multer';

const router = express.Router();

const Storage = multer.memoryStorage()

const upload = multer({ storage:Storage });

router.post(
  "/api/garments",
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
    body("gender").custom((value) => Object.values(Gender).includes(value)),
    body("price").isFloat({ gt: 0 }),
    body("small").isFloat({ gt: 0 }),
    body("medium").isFloat({ gt: 0 }),
    body("large").isFloat({ gt: 0 }),
    body("xlarge").isFloat({ gt: 0 }),
    body("xxlarge").isFloat({ gt: 0 }),
    check('frontPhoto').custom((val, {req}) =>  req.files.frontPhoto ),
    check('backPhoto').custom((val, {req}) =>  req.files.backPhoto ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const adminId = req.currentUser!.id;
    const { garmentClass, gender, price, small, medium, large, xlarge, xxlarge } = req.body;

    //@ts-ignore
    const {frontPhoto, backPhoto, photos} = req.files;

    const garment = Garment.build({
        adminId,
        garmentClass,
        gender,
        price,
        small,
        medium,
        large,
        xlarge,
        xxlarge,
        frontPhoto: frontPhoto[0].buffer.toString('base64'),
        backPhoto: backPhoto[0].buffer.toString('base64'),
    });
    if(photos) {
        //@ts-ignore
        garment.set({photos: photos.map(val => val.buffer.toString('base64'))});
    }
    await garment.save();

    new GarmentCreatedPublisher(natsWrapper.client).publish({
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
        frontPhoto: garment.frontPhoto,
        backPhoto: garment.backPhoto
    });

    res.status(201).send(garment);
  }
);

export { router as newGarmentsRouter };
