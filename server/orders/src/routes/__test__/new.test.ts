import {
  currentUser,
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

it("wrong creds", async () => {
  await request(app).post("/api/orders").send({}).expect(401);

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin(UserType.Admin))
    .send({})
    .expect(401);
});

it("wrong data", async () => {
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin(UserType.Customer))
    .send()
    .expect(400);

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin(UserType.Customer))
    .send({ garments: [{}] })
    .expect(400);

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin(UserType.Customer))
    .send({
      garments: [
        {
          garmentId: new mongoose.Types.ObjectId().toHexString(),
          quantity: -1,
          price: 0,
        },
      ],
    })
    .expect(400);

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin(UserType.Customer))
    .send({
      garments: [
        {
          garmentId: new mongoose.Types.ObjectId().toHexString(),
          price: 0,
        },
      ],
    })
    .expect(400);
});

it("order reserved garments", async () => {
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
          quantity: 3,
          price: 2,
          size: GarmentSize.Small,
        },
      ],
    })
    .expect(400);
});

it("order success", async () => {
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
          quantity: 1,
          price: 2,
          size: GarmentSize.Small,
        },
      ],
    })
    .expect(201);
});
