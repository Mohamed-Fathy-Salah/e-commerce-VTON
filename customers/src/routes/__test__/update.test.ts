import { app } from "../../app";
import request from "supertest";
import { GarmentClass, GarmentSize, Gender, SkinTone, UserType } from "@mfsvton/common";
import mongoose from "mongoose";
import { Customer } from "../../models/customer";

it("error if user is not signed in ", async () => {
  await request(app).put("/api/customerdata").expect(401);
});

it("error if user is admin ", async () => {
  await request(app)
    .put("/api/customerdata")
    .set("Cookie", global.signin(UserType.Admin))
    .expect(401);
});

it("error if user is not in DB ", async () => {
  await request(app)
    .put("/api/customerdata")
    .set("Cookie", global.signin(UserType.Customer))
    .expect(404);
});

it("correct data when user signin", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();

  const customer = Customer.build({
    customerId,
    name: "hi",
  });
  customer.save();

  const cookie = global.signin(UserType.Customer, customerId);

  const res = await request(app)
  .put('/api/customerdata')
  .set('Cookie', cookie)
  .send({
      name : 'hihi',
      gender: Gender.Male,
      age: 15,
      skinTone: SkinTone.White,
      sizePreferences: [{ garmentClass: GarmentClass.Shirt, garmentSize: GarmentSize.Large }]
    })
  .expect(201)

  expect(res.body.name).toEqual('hihi');
  expect(res.body.gender).toEqual(Gender.Male);
  expect(res.body.age).toEqual(15);
  expect(res.body.skinTone).toEqual(SkinTone.White);
  expect(res.body.sizePreferences.length).toEqual(1);
});

it.todo('add measurements and append-modify size preferences');
