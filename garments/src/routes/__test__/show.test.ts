import { app } from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import { GarmentClass, GarmentSize, Gender, UserType } from "@mfsvton/common";

it("get data of admin", async () => {
  const adminId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Admin, adminId);

  await request(app)
    .post("/api/garments")
    .set("Cookie", cookie)
    .send({
      garmentClass: GarmentClass.Shirt,
      gender: Gender.Male,
      price: 20,
      available: [
        {
          size: GarmentSize.Small,
          quantity: 2,
        },
        {
          size: GarmentSize.Large,
          quantity: 3,
        },
      ],
    })
    .expect(201);

  const { body } = await request(app)
    .get("/api/garments/" + adminId)
    .expect(200);

  expect(body[0].garmentClass).toEqual(GarmentClass.Shirt);
  expect(body[0].gender).toEqual(Gender.Male);
  expect(body[0].price).toEqual(20);
  expect(body[0].available.length).toEqual(2);
});
