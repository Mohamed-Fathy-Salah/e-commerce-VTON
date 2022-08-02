import { app } from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import { GarmentClass, GarmentSize, Gender, UserType } from "@mfsvton/common";


it("error if user is not signed in ", async () => {
  await request(app).get("/api/garments").expect(401);
});

it("error if user is admin ", async () => {
  await request(app)
    .get("/api/garments")
    .set("Cookie", global.signin(UserType.Admin))
    .expect(401);
});

it("error if user is not in DB ", async () => {
  await request(app)
    .get("/api/garments")
    .set("Cookie", global.signin(UserType.Customer))
    .expect(404);
});

it("correct data when user signin", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);

  const res = await request(app)
    .post("/api/garments")
    .set("Cookie", cookie)
    .send({
      name: "blah",
    })
    .expect(201);

  await request(app).get("/api/garments").set("Cookie", cookie).expect(200);

  expect(res.body.customerId).toEqual(customerId);
});
