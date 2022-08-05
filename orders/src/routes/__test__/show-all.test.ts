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
  await request(app).get("/api/orders/").send().expect(401);

  await request(app)
    .get("/api/orders/")
    .set("Cookie", global.signin(UserType.Admin))
    .send()
    .expect(401);
});

it("no orders created", async () => {
  const res = await request(app)
    .get("/api/orders/")
    .set("Cookie", global.signin(UserType.Customer))
    .send()
    .expect(200);

  expect(res.body.length).toEqual(0);
});

it("orders created", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);
  const garmentId = new mongoose.Types.ObjectId().toHexString();

  const garment = Garments.build({
    id: garmentId,
    garmentClass: GarmentClass.Shirt,
    gender: Gender.Male,
    available: [
      {
        size: GarmentSize.Small,
        quantity: 2,
      },
    ],
    price: 2,
  });
  await garment.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      garments: [
        {
          garmentId,
          quantity: 2,
          price: 2,
          size: GarmentSize.Small,
        },
      ],
    })
    .expect(201);

  const res = await request(app)
    .get("/api/orders/")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.length).toEqual(1);
  expect(res.body[0].customerId).toEqual(customerId);
});
