import { NotFoundError, requireAdminAuth } from '@mfsvton/common';
import express, {Response, Request} from 'express'
import { Order } from '../models/orders';


const router = express.Router();

router.get(
    '/api/admindata/orders/:orderId',
    requireAdminAuth,
    async (req: Request, res: Response) => {
        const adminId = req.currentUser!.id;
        const orderId = req.params.orderId;

        const order = await Order.findOne({orderId, adminId});

        if(!order) {
            throw new NotFoundError();
        }

        return res.status(200).send(order);
    }
)
