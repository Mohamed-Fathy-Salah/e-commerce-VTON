import { app } from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import { GarmentClass, Gender, UserType } from "@mfsvton/common";

it("error when setting new garment with out login or with customer", async () => {
  await request(app).post("/api/garments").expect(401);

  await request(app)
    .post("/api/garments")
    .set("Cookie", global.signin(UserType.Customer))
    .expect(401);
});

it("error when data is not complete or is empty", async () => {
  await request(app)
    .post("/api/garments")
    .set("Cookie", global.signin(UserType.Admin))
    .expect(400);

  await request(app)
    .post("/api/garments")
    .set("Cookie", global.signin(UserType.Admin))
      .field('garmentClass', GarmentClass.Shirt)
      .field('gender', Gender.Neutral)
      .field('price', 15)
    .expect(400);
});

it("201 when garment data is right", async () => {
  const adminId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Admin, adminId);

  const res = await request(app)
    .post("/api/garments")
    .set("Cookie", cookie)
      .field('name', "blah")
      .field('description', "blah")
      .field('garmentClass', GarmentClass.Shirt)
      .field('gender', Gender.Neutral)
      .field('price', 15)
      .field('small', 1)
      .field('medium', 1)
      .field('large', 1)
      .field('xlarge', 1)
      .field('xxlarge', 1)
      .attach('frontPhoto', global.imagePath)
      .attach('backPhoto', global.imagePath)
      .expect(201);

      return { res, adminId, cookie };


  expect(res.body.adminId).toEqual(adminId);
});
