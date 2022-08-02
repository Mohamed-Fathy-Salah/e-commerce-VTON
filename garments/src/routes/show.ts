import express, { Response, Request } from "express";
import { Garment } from "../models/garment";

const router = express.Router();

router.get(
  "/api/garments/:adminId",
  async (req: Request, res: Response) => {
      // todo: hide ids if not currnetuser
      //const adminId = req.params.adminId;

      const garments = await Garment.find({adminId: req.params.adminId});

      // if it is the currentuser
      //if(req.currentUser && req.currentUser.type === UserType.Admin && req.currentUser.id === adminId) {
          //return res.status(200).send(garments);
      //}

      return res.status(200).send(garments);
  }
);

export {router as showGarmentsRouter}
