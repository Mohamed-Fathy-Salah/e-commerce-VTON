import { app } from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import {
  GarmentClass,
  Gender,
  UserType,
} from "@mfsvton/common";

it("error not auth", async () => {
  const garmentId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put("/api/garments/" + garmentId)
    .send({})
    .expect(401);

  await request(app)
    .put("/api/garments/" + garmentId)
    .set("Cookie", global.signin(UserType.Customer))
    .send({})
    .expect(401);
});

it("error not valid data", async() => {
  const adminId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Admin, adminId);

  const {body} = await request(app)
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

  await request(app)
    .put("/api/garments/" + body.id)
    .set("Cookie", cookie)
      .field('name', "blah")
      .field('description', "blah")
      .field('garmentClass', GarmentClass.Shirt)
      .field('gender', Gender.Neutral)
      .field('price', -1)
      .field('small', 1)
      .field('medium', 1)
      .field('large', -1)
      .field('xlarge', 1)
      .field('xxlarge', 1)
    .expect(400);
});

it("error non existing garment", async () => {
  const garmentId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put("/api/garments/" + garmentId)
    .set("Cookie", global.signin(UserType.Admin))
      .field('name', "blah")
      .field('description', "blah")
      .field('garmentClass', GarmentClass.Shirt)
      .field('gender', Gender.Neutral)
      .field('price', 1)
      .field('small', 1)
      .field('medium', 1)
      .field('large', 1)
      .field('xlarge', 1)
      .field('xxlarge', 1)
    .expect(404);
});

it("good boi :)", async () => {
  const adminId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Admin, adminId);

  await request(app)
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


  const {body} = await request(app)
    .get("/api/garments/admin/" + adminId)
    .expect(200);
  expect(body.length).toEqual(1);

   await request(app)
    .put("/api/garments/" + body[0].id)
    .set("Cookie", cookie)
      .field('name', "blah")
      .field('description', "blah")
      .field('garmentClass', GarmentClass.Shirt)
      .field('gender', Gender.Male)
      .field('price', 10)
      .field('small', 1)
      .field('medium', 1)
      .field('large', 1)
      .field('xlarge', 1)
      .field('xxlarge', 1)
    .expect(201);

   const {body: body1} = await request(app)
    .get("/api/garments/admin/" + adminId)
    .expect(200);

  expect(body1.length).toEqual(1);

  expect(body1[0].gender).toEqual(Gender.Male);
  expect(body1[0].price).toEqual(10);
});
