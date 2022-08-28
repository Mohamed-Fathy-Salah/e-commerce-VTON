import { GarmentClass, Gender, UserType } from "@mfsvton/common";
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
          small: -1,
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
          small: 3,
          medium: 0,
          large: 0,
          xlarge: 0,
          xxlarge: 0,
        },
      ],
    })
    .expect(400);
});

it("order garment with wrong adminid", async () => {
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
    adminId: "adf",
  });
  await garment.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      garments: [
        {
        adminId: "bbb",
          garmentId,
          price: 2,
          small: 3,
          medium: 0,
          large: 0,
          xlarge: 0,
          xxlarge: 0,
        },
      ],
    })
    .expect(404);
});

it("order success", async () => {
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
    adminId: "adff",
  });
  await garment.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      garments: [
        {
          adminId: "adff",
          garmentId,
          price: 2,
          small: 2,
          medium: 1,
          large: 0,
          xlarge: 1,
          xxlarge: 1,
        },
      ],
    })
    .expect(201);
});
