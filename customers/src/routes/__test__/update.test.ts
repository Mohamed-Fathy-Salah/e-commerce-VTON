import { app } from "../../app";
import request from "supertest";
import {
  GarmentClass,
  GarmentSize,
  Gender,
  SkinTone,
  UserType,
} from "@mfsvton/common";
import mongoose from "mongoose";

it("error if user is not signed in ", async () => {
  await request(app).put("/api/customerdata").expect(401);
});

it("error if user is admin ", async () => {
  await request(app)
    .put("/api/customerdata")
    .set("Cookie", global.signin(UserType.Admin))
    .send({})
    .expect(401);
});

it("error if user is not in DB ", async () => {
  await request(app)
    .put("/api/customerdata")
    .set("Cookie", global.signin(UserType.Customer))
    .field("name", "hihi")
    .field("gender", Gender.Male)
    .field("age", 15)
    .field("skinTone", SkinTone.White)
    .field(
      "sizePreferences",
      JSON.stringify([
        { garmentClass: GarmentClass.Shirt, garmentSize: GarmentSize.Large },
      ])
    )
    .expect(404);
});

it("error if wrong data", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);

  await request(app)
    .post("/api/customerdata")
    .set("Cookie", cookie)
    .send({
      name: "blah",
      age: 15,
      customerId,
      gender: Gender.Male,
    })
    .expect(201);

  await request(app)
    .put("/api/customerdata")
    .set("Cookie", cookie)
    .field("name", "hihi")
    .field("gendes", Gender.Male)
    .field("age", 15)
    .field("skinTone", SkinTone.White)
    .field(
      "sizePreferences",
      JSON.stringify([
        { garmentClass: GarmentClass.Shirt, garmentSize: GarmentSize.Large },
        { GarmentClass: "shit" },
      ])
    )
    .expect(400);

  await request(app)
    .put("/api/customerdata")
    .set("Cookie", cookie)
    .field("name", "hihi")
    .field("gendes", Gender.Male)
    .field("age", 15)
    .field("skinTone", SkinTone.White)
    .field(
      "sizePreferences",
      JSON.stringify([
        { garmentClass: GarmentClass.Shirt, garmentSize: GarmentSize.Large },
      ])
    )
    .field(
      "measurements",
      JSON.stringify({
        weight: 100,
        chest: 100,
        waist: 100,
        hips: 100,
        arm: 100,
        inseam: 100,
        neckline: 100,
        shoulder: 100,
      })
    )
    .expect(400);

  await request(app)
    .put("/api/customerdata")
    .set("Cookie", cookie)
    .field("name", "hihi")
    .field("gendes", Gender.Male)
    .field("age", 15)
    .field("skinTone", SkinTone.White)
    .field(
      "measurements",
      JSON.stringify({
        height: 100,
        weight: 100,
        waist: 100,
        hips: 100,
        arm: 100,
        inseam: 100,
        neckline: 100,
        shoulder: 100,
      })
    )
    .expect(400);
});

it("correct data when user signin", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);

  await request(app)
    .post("/api/customerdata")
    .set("Cookie", cookie)
    .send({
      name: "blah",
      age: 15,
      customerId,
      gender: Gender.Male,
    })
    .expect(201);

  const res = await request(app)
    .put("/api/customerdata")
    .set("Cookie", cookie)
    .field("name", "hihi")
    .field("gender", Gender.Male)
    .field("age", 15)
    .field("skinTone", SkinTone.White)
    .field(
      "measurements",
      JSON.stringify({
        height: 150,
        chest: 100,
        weight: 100,
        waist: 100,
        hips: 100,
        arm: 60,
        inseam: 100,
        neckline: 50,
        shoulder: 50,
      })
    )
    .expect(201);

  expect(res.body.customerId).toEqual(customerId);
  expect(res.body.name).toEqual("hihi");
  expect(res.body.gender).toEqual(Gender.Male);
  expect(res.body.age).toEqual(15);
  expect(res.body.skinTone).toEqual(SkinTone.White);
  expect(res.body.sizePreferences.length).toEqual(0);
  expect(res.body.measurements.height).toEqual(150);
});

it("append-modify size preferences", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);

  await request(app)
    .post("/api/customerdata")
    .set("Cookie", cookie)
    .send({
      name: "blah",
      age: 15,
      customerId,
      gender: Gender.Male,
    })
    .expect(201);

    await request(app)
    .put("/api/customerdata")
    .set("Cookie", cookie)
    .field("name", "hihi")
    .field("gender", Gender.Male)
    .field("age", 15)
    .field("skinTone", SkinTone.White)
    .field(
      "sizePreferences",
      JSON.stringify({})
    )
    .expect(400);

    await request(app)
    .put("/api/customerdata")
    .set("Cookie", cookie)
    .field("name", "hihi")
    .field("gender", Gender.Male)
    .field("age", 15)
    .field("skinTone", SkinTone.White)
    .field(
      "sizePreferences",
      JSON.stringify([])
    )
    .expect(201);

    const res = await request(app)
    .put("/api/customerdata")
    .set("Cookie", cookie)
    .field("name", "hihi")
    .field("gender", Gender.Male)
    .field("age", 15)
    .field("skinTone", SkinTone.White)
    .field(
      "sizePreferences",
      JSON.stringify([{garmentClass: GarmentClass.Shirt, garmentSize: GarmentSize.Large}, {garmentClass: GarmentClass.Shirt, garmentSize: GarmentSize.Small},{garmentClass: GarmentClass.Pant, garmentSize: GarmentSize.Medium}])
    )
    .expect(201);

    expect(res.body.sizePreferences.length).toEqual(2);
});
