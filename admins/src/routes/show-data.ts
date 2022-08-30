import { NotFoundError } from "@mfsvton/common";
import express, { Request, Response } from "express";
import { Admin } from "../models/admin";

const router = express.Router();

router.get("/api/admindata/:admindata", async (req: Request, res: Response) => {
  const adminId = req.params.adminId;

  const admin = await Admin.findOne({ adminId });

  if (!admin) {
    throw new NotFoundError();
  }

  return res.status(200).send(admin);
});

export { router as showDataRouter };
