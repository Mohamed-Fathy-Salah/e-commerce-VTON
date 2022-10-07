import {
  GarmentClass,
  GarmentSize,
  Gender,
  NotFoundError,
  requireCustomerAuth,
  SkinTone,
  validateRequest,
} from '@mfsvton/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import { CustomerDataUpdatedPublisher } from '../events/publishers/customer-data-updated-publisher';
import { Customer } from '../models/customer';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const Storage = multer.memoryStorage();

const upload = multer({ storage: Storage });

router.put(
  '/api/customerdata',
  requireCustomerAuth,
  upload.single('photo'),
  [
    body('name').notEmpty(),
    body('gender').custom((value) => Object.values(Gender).includes(value)),
    body('age').custom((value) => value > 13 && value < 120),
    body('skinTone').custom((value) => Object.values(SkinTone).includes(value)),
    body('measurements').custom((value) => {
      if (!value) return true;

      try {
        const {
          height,
          arm,
          hips,
          weight,
          chest,
          waist,
          inseam,
          neckline,
          shoulder,
        } = JSON.parse(value);

        return (
          height &&
          arm &&
          hips &&
          weight &&
          chest &&
          waist &&
          inseam &&
          neckline &&
          shoulder &&
          height >= 140 &&
          height <= 250 &&
          arm >= 50 &&
          arm <= 80 &&
          hips >= 80 &&
          hips <= 120 &&
          weight >= 40 &&
          weight <= 130 &&
          chest >= 80 &&
          chest <= 130 &&
          waist >= 80 &&
          waist <= 130 &&
          inseam >= 60 &&
          inseam <= 100 &&
          neckline >= 35 &&
          neckline <= 60 &&
          shoulder >= 30 &&
          shoulder <= 70
        );
      } catch (e) {
        console.log(e);
        return false;
      }
    }),
    body('sizePreferences').custom((value) => {
      if (!value) return true;

      try {
        const arr = JSON.parse(value);

        for (const obj of arr) {
          const { garmentClass, garmentSize } = obj;

          if (
            !garmentClass ||
            !garmentSize ||
            !Object.values(GarmentClass).includes(garmentClass) ||
            !Object.values(GarmentSize).includes(garmentSize)
          )
            return false;
        }

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const customerId = req.currentUser!.id;

    const customer = await Customer.findOne({ customerId });
    if (!customer) {
      throw new NotFoundError();
    }

    customer.set({ name: req.body.name || customer.name });
    customer.set({ gender: req.body.gender || customer.gender });
    customer.set({ age: req.body.age || customer.age });
    customer.set({ skinTone: req.body.skinTone || customer.skinTone });

    if (req.body.measurements) {
      customer.set({ measurements: JSON.parse(req.body.measurements) });
    }

    if (req.body.sizePreferences) {
      const mp = new Map<string, string>();
      const reqSP = JSON.parse(req.body.sizePreferences);
      for (const obj of reqSP) mp.set(obj.garmentClass, obj.garmentSize);

      const arr: { garmentClass: string; garmentSize: string }[] = [];
      for (const [key, val] of mp.entries())
        arr.push({ garmentClass: key, garmentSize: val });

      customer.set({ sizePreferences: arr });
    }

    if (req.file) {
      customer.set({ photo: req.file.buffer.toString('base64') });
    }

    await customer.save();

    new CustomerDataUpdatedPublisher(natsWrapper.client).publish({
      customerId: customer.customerId,
      name: customer.name,
      gender: customer.gender,
      age: customer.age,
      skin: customer.skinTone,
      measurements: customer.measurements,
      sizePreferences: customer.sizePreferences,
      photo: customer.photo,
      version: customer.version,
    });

    res.status(201).send(customer);
  }
);
export { router as updateCustomerDataRoute };
