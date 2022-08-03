import { app } from "../../app";
import request from "supertest";
import { UserType } from "@mfsvton/common";
import mongoose from "mongoose";

// todo: fix tests

it("error if user is not in DB ", async () => {
    const customerId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get("/api/customerdata/" + customerId)
    .set("Cookie", global.signin(UserType.Customer))
    .expect(404);
});

it("correct data when user signin", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();

  const res = await request(app)
    .post("/api/customerdata")
    .set("Cookie", global.signin(UserType.Customer, customerId))
    .send({
      name: "blah",
    })
    .expect(201);

  await request(app).get("/api/customerdata/" + customerId).expect(200);

  expect(res.body.customerId).toEqual(customerId);
});
