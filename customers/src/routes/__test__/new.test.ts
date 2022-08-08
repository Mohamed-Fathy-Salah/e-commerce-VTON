import { app } from "../../app";
import request from "supertest";
import { Gender, UserType } from "@mfsvton/common";
import mongoose from "mongoose";

it("error when setting customer data with out login or with admin", async () => {
  await request(app)
    .post("/api/customerdata")
    .send({
      customerId: new mongoose.Types.ObjectId().toHexString(),
      name: "blah",
      age: 15,
      gender: Gender.Male
    })
    .expect(401);

  await request(app)
    .post("/api/customerdata")
    .set("Cookie", global.signin(UserType.Admin))
    .send({
      customerId: new mongoose.Types.ObjectId().toHexString(),
      name: "blah",
      age: 15,
      gender: Gender.Male
    })
    .expect(401);
});

it("error when name is not added or is empty", async () => {
  await request(app)
    .post("/api/customerdata")
    .set("Cookie", global.signin(UserType.Customer))
    .send({})
    .expect(400);

  await request(app)
    .post("/api/customerdata")
    .set("Cookie", global.signin(UserType.Customer))
    .send({
      name: "",
    })
    .expect(400);
});

it("201 when customer data is right", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);
  const res = await request(app)
    .post("/api/customerdata")
    .set("Cookie", cookie)
    .send({
        customerId,
      name: "blah",
      age: 15,
      gender: Gender.Male
    })
    .expect(201);

  expect(res.body.customerId).toEqual(customerId);
});
