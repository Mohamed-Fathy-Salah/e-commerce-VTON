import { requireAdminAuth } from '@mfsvton/common';
import express, {Response, Request} from 'express'
import { Order } from '../models/orders';


const router = express.Router();

router.get(
    '/api/admindata/orders',
    requireAdminAuth,
    async (req: Request, res: Response) => {
        const adminId = req.currentUser!.id;

        const orders = await Order.find({adminId});

        return res.status(200).send(orders);
    }
)
