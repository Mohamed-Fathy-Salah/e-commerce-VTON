import { app } from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import { GarmentClass, Gender, UserType } from "@mfsvton/common";

it("get data of admin", async () => {
  const adminId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Admin, adminId);

  await request(app)
      .post("/api/garments")
      .set("Cookie", cookie)
      .field('garmentClass', GarmentClass.Shirt)
      .field('gender', Gender.Male)
      .field('price', 20)
      .field('small', 1)
      .field('medium', 1)
      .field('large', 1)
      .field('xlarge', 1)
      .field('xxlarge', 1)
      .attach('frontPhoto', global.imagePath)
      .attach('backPhoto', global.imagePath)
      .expect(201);

  const {body} = await request(app).get("/api/garments/" + adminId).expect(200);

  expect(body[0].garmentClass).toEqual(GarmentClass.Shirt);
  expect(body[0].gender).toEqual(Gender.Male);
  expect(body[0].price).toEqual(20);
  expect(body[0].frontPhoto).toBeDefined();
  expect(body[0].backPhoto).toBeDefined();
});
