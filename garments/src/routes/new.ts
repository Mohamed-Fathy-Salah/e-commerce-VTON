import {
    BadRequestError,
  GarmentClass,
  GarmentSize,
  Gender,
  requireAdminAuth,
  validateRequest,
} from "@mfsvton/common";
import express, { Response, Request } from "express";
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
    body("available").custom((value) => {
        value = JSON.parse(value);
        return value.every(
            (garment: { size: GarmentSize; quantity: number }) =>
            Object.values(GarmentSize).includes(garment.size) &&
                garment.quantity >= 0
        )
    }
    ),
    check('frontPhoto').custom((val, {req}) =>  req.files.frontPhoto ),
    check('backPhoto').custom((val, {req}) =>  req.files.backPhoto ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const adminId = req.currentUser!.id;
    const { garmentClass, gender, price, available } = req.body;

    if(req.files!.frontPhoto || req.files!.backPhoto) {
        throw new BadRequestError();
    }

    const garment = Garment.build({
        adminId,
        garmentClass,
        gender,
        price,
        available,
        frontPhoto: req.files.frontPhoto,
        backPhoto: req.files.backPhoto,
    });
    await garment.save();

    new GarmentCreatedPublisher(natsWrapper.client).publish({
        garmentId: garment.id,
        adminId: garment.adminId,
        garmentClass: garment.garmentClass,
        gender: garment.gender,
        available: garment.available,
        price: garment.price,
        version: garment.version
    });

    res.status(201).send(garment);
  }
);

export { router as newGarmentsRouter };
