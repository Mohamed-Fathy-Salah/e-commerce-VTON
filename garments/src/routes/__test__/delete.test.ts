import { app } from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import { GarmentClass, Gender, UserType } from "@mfsvton/common";

it("error with wrong credentials", async () => {
  const garmentId = new mongoose.Types.ObjectId().toHexString();
  const userId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete("/api/garments/" + garmentId)
    .send()
    .expect(401);

  await request(app)
    .delete("/api/garments/" + garmentId)
    .set("Cookie", global.signin(UserType.Customer, userId))
    .send()
    .expect(401);
});

it("delete non existing garment", async () => {
  const garmentId = new mongoose.Types.ObjectId().toHexString();
  const adminId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete("/api/garments/" + garmentId)
    .set("Cookie", global.signin(UserType.Admin, adminId))
    .send()
    .expect(404);
});

it("create and delete garment successfully", async () => {
  const adminId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Admin, adminId);

  const res = await request(app)
    .post("/api/garments")
    .set("Cookie", cookie)
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

  const { body: body1 } = await request(app)
    .get("/api/garments/" + adminId)
    .expect(200);
  expect(body1.length).toEqual(1);

  await request(app)
    .delete("/api/garments/" + res.body.id)
    .set("Cookie", global.signin(UserType.Admin, adminId))
    .send()
    .expect(200);

  const { body: body2 } = await request(app)
    .get("/api/garments/" + adminId)
    .expect(200);
  expect(body2.length).toEqual(0);
});
