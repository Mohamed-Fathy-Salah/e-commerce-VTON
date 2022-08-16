import { app } from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import {
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

it("error not valid data", async() => {
  const adminId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Admin, adminId);

  const {body} = await request(app)
    .post("/api/garments")
    .set("Cookie", cookie)
    .send({
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

  await request(app)
    .put("/api/garments/" + body.id)
    .set("Cookie", cookie)
    .send({
      garmentClass: "hadf",
      gender: "ad",
      price: -1,
    })
    .expect(400);
});

it("error non existing garment", async () => {
  const garmentId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put("/api/garments/" + garmentId)
    .set("Cookie", global.signin(UserType.Admin))
    .send({
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
    .expect(404);
});

it("good boi :)", async () => {
  const adminId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Admin, adminId);

  await request(app)
    .post("/api/garments")
    .set("Cookie", cookie)
    .send({
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
    .send({
      garmentClass: GarmentClass.Shirt,
      gender: Gender.Male,
      price: 10,
      available: [
        {
          size: GarmentSize.Small,
          quantity: 3,
        },
        {
          size: GarmentSize.Large,
          quantity: 2,
        },
      ],
    })
    .expect(201);

   const {body: body1} = await request(app)
    .get("/api/garments/" + adminId)
    .expect(200);

  expect(body1.length).toEqual(1);

  expect(body1[0].gender).toEqual(Gender.Male);
  expect(body1[0].price).toEqual(10);
});

it('correct data and update available', async () => {

})
