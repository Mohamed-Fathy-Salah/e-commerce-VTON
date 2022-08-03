import { app } from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import {
  currentUser,
  GarmentClass,
  GarmentSize,
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

it.todo("error not valid data");

it("error non existing garment", async () => {
  const garmentId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put("/api/garments/" + garmentId)
    .set("Cookie", global.signin(UserType.Admin))
    .send({})
    .expect(404);
});

it("good boi :)", async () => {
  const adminId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Admin, adminId);

  const blah = await request(app)
    .post("/api/garments")
    .set("Cookie", cookie)
    .send({
      adminId,
      garmentClass: GarmentClass.Shirt,
      gender: Gender.Neutral,
      price: 15,
      available: [
        {
          size: GarmentSize.Small,
          quantity: 1,
        },
      ],
    })
    .expect(201);

  const {body} = await request(app)
    .get("/api/garments/" + adminId)
    .expect(200);
  expect(body.length).toEqual(1);

   await request(app)
    .put("/api/garments/" + body[0].id)
    .set("Cookie", cookie)
    .send({gender: Gender.Male, price: 10})
    .expect(201);

   const {body: body1} = await request(app)
    .get("/api/garments/" + adminId)
    .expect(200);

  expect(body1.length).toEqual(1);

  expect(body1[0].gender).toEqual(Gender.Male);
  expect(body1[0].price).toEqual(10);
});

it.todo('correct data and update available')
