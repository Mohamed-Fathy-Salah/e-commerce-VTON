import { GarmentClass, Gender, UserType } from "@mfsvton/common";
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
    garmentId,
    garmentClass: GarmentClass.Shirt,
    gender: Gender.Male,
    small: 2,
    medium: 2,
    large: 2,
    xlarge: 2,
    xxlarge: 2,
    price: 2,
    adminId: "adf",
  });
  await garment.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      garments: [
        {
          adminId: "adf",
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
    .get("/api/orders/")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.length).toEqual(1);
  expect(res.body[0].customerId).toEqual(customerId);
});
