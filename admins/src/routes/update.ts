import { NotFoundError, requireAdminAuth, validateRequest } from '@mfsvton/common';
import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import multer from 'multer'
import { Admin } from '../models/admin';

const router = express.Router();

const Storage = multer.memoryStorage()

const upload = multer({storage: Storage})

router.put(
    '/api/admindata',
    requireAdminAuth,
    upload.single('photo'),
    body("name").notEmpty(),
    validateRequest,
    async (req: Request, res: Response) => {
        const adminId = req.currentUser!.id;

        const admin = await Admin.findById(adminId);

        if(!admin) {
            throw new NotFoundError();
        }

        //@ts-ignore
        const {photo} = req.file;

        admin.set({name: req.body.name})

        if(photo) {
            //@ts-ignore
            admin.set({photo: photo.buffer.toString('base64')});
        }

        await admin.save();

        return res.status(200).send(admin);
    }
)
