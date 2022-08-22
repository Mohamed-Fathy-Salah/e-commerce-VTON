import {
  GarmentClass,
  GarmentSize,
  Gender,
  OrderStatus,
  UserType,
} from "@mfsvton/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Garments } from "../../models/garments";

it("not correct creds", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get("/api/orders/" + orderId)
    .send()
    .expect(401);

  await request(app)
    .get("/api/orders/" + orderId)
    .set("Cookie", global.signin(UserType.Admin))
    .send()
    .expect(401);
});

it("order does not exist", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get("/api/orders/" + orderId)
    .set("Cookie", global.signin(UserType.Customer))
    .send()
    .expect(404);
});

it("customer not current user", async () => {
  const garmentId = new mongoose.Types.ObjectId().toHexString();

  const garment = Garments.build({
    id: garmentId,
    garmentClass: GarmentClass.Shirt,
    gender: Gender.Male,
    small: 2,
    medium: 2,
    large: 2,
    xlarge: 2,
    xxlarge: 2,
    price: 2,
  });
  await garment.save();

  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin(UserType.Customer))
    .send({
      garments: [
        {
          garmentId,
          price: 2,
          small: 2,
          medium: 2,
          large: 2,
          xlarge: 2,
          xxlarge: 2,
        },
      ],
    });

  await request(app)
    .get("/api/orders/" + res.body.id)
    .set("Cookie", global.signin(UserType.Customer))
    .send()
    .expect(401);
});

it("show order", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);
  const garmentId = new mongoose.Types.ObjectId().toHexString();

  const garment = Garments.build({
    id: garmentId,
    garmentClass: GarmentClass.Shirt,
    gender: Gender.Male,
    small: 2,
    medium: 2,
    large: 2,
    xlarge: 2,
    xxlarge: 2,
    price: 2,
  });
  await garment.save();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      garments: [
        {
          garmentId,
          price: 2,
          small: 2,
          medium: 2,
          large: 2,
          xlarge: 2,
          xxlarge: 2,
        },
      ],
    })
    .expect(201);

  const res = await request(app)
    .get("/api/orders/" + order.id)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.customerId).toEqual(customerId);
  expect(res.body.garments.length).toEqual(1);
  expect(res.body.status).toEqual(OrderStatus.Created);
});
