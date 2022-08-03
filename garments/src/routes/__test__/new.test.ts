import { app } from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import { GarmentClass, GarmentSize, Gender, UserType } from "@mfsvton/common";

const newGarment = {
  adminId: new mongoose.Types.ObjectId().toHexString(),
  garmentClass: GarmentClass.Shirt,
  gender: Gender.Neutral,
  price: 15,
  available: [
    {
      size: GarmentSize.Small,
      quantity: 1,
    },
  ],
};

it("error when setting new garment with out login or with customer", async () => {
  await request(app).post("/api/garments").send(newGarment).expect(401);

  await request(app)
    .post("/api/garments")
    .set("Cookie", global.signin(UserType.Customer))
    .send(newGarment)
    .expect(401);
});

it("error when data is not complete or is empty", async () => {
  await request(app)
    .post("/api/garments")
    .set("Cookie", global.signin(UserType.Admin))
    .send({})
    .expect(400);

  await request(app)
    .post("/api/garments")
    .set("Cookie", global.signin(UserType.Admin))
    .send({
      adminId: new mongoose.Types.ObjectId().toHexString(),
      garmentClass: "",
    })
    .expect(400);
});

it("201 when garment data is right", async () => {
  const adminId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Admin, adminId);

  const res = await request(app)
    .post("/api/garments")
    .set("Cookie", cookie)
    .send(newGarment)
    .expect(201);

  expect(res.body.adminId).toEqual(adminId);
});
