import { app } from "../../app";
import request from "supertest";
import { GarmentSize, UserType } from "@mfsvton/common";
import { Cart } from "../../models/cart";
import mongoose from "mongoose";

it("error with wrong creds", async () => {
  await request(app).put("/api/cart").send({}).expect(401);

  await request(app)
    .put("/api/cart")
    .set("Cookie", global.signin(UserType.Admin))
    .send({})
    .expect(401);
});

it("cart not found error", async () => {
  await request(app)
    .put("/api/cart")
    .set("Cookie", global.signin(UserType.Customer))
    .send({
      garmentId: new mongoose.Types.ObjectId().toHexString(),
      price: 10,
      small: 1,
      medium: 1,
      large: 1,
      xlarge: 1,
      xxlarge: 1,
    })
    .expect(404);
});

it("validate body", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);
  const garmentId = new mongoose.Types.ObjectId().toHexString();

  const cart = Cart.build({ customerId });
  await cart.save();

  await request(app)
    .put("/api/cart")
    .set("Cookie", cookie)
    .send({ garmentId, price: 10, small: 1, large: 1, xlarge: 1, xxlarge: 1 })
    .expect(400);

  await request(app)
    .put("/api/cart")
    .set("Cookie", cookie)
    .send({ garmentId, price: 0, small: 1, medium: 1, large: 1, xxlarge: 1 })
    .expect(400);

  await request(app)
    .put("/api/cart")
    .set("Cookie", cookie)
    .send({ garmentId })
    .expect(400);
});

it("updated successfully", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);
  const garmentId = new mongoose.Types.ObjectId().toHexString();

  const cart = Cart.build({ customerId });
  await cart.save();

  await request(app)
    .put("/api/cart")
    .set("Cookie", cookie)
    .send({
      garmentId,
      price: 10,
      small: 1,
      medium: 1,
      large: 1,
      xlarge: 1,
      xxlarge: 1,
    })
    .expect(201);

  await request(app)
    .put("/api/cart")
    .set("Cookie", cookie)
    .send({
      garmentId,
      price: 10,
      small: 2,
      medium: 1,
      large: 3,
      xlarge: 0,
      xxlarge: 1,
    })
    .expect(201);

  await request(app)
    .put("/api/cart")
    .set("Cookie", cookie)
    .send({
      garmentId,
      price: 10,
      small: 0,
      medium: 0,
      large: 3,
      xlarge: 0,
      xxlarge: 0,
    })
    .expect(201);

  await request(app)
    .put("/api/cart")
    .set("Cookie", cookie)
    .send({
      garmentId: new mongoose.Types.ObjectId().toHexString(),
      price: 20,
      small: 1,
      medium: 0,
      large: 1,
      xlarge: 0,
      xxlarge: 0,
    })
    .expect(201);

  const res = await request(app)
    .get("/api/cart")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.customerId).toEqual(customerId);
  expect(res.body.garments.length).toEqual(2);
});

it("delete when quantity = 0", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);
  const garmentId = new mongoose.Types.ObjectId().toHexString();

  const cart = Cart.build({ customerId });
  await cart.save();

  await request(app)
    .put("/api/cart")
    .set("Cookie", cookie)
    .send({
      garmentId,
      price: 10,
      small: 1,
      medium: 1,
      large: 1,
      xlarge: 1,
      xxlarge: 1,
    })
    .expect(201);

  await request(app)
    .put("/api/cart")
    .set("Cookie", cookie)
    .send({
      garmentId,
      price: 10,
      small: 0,
      medium: 0,
      large: 0,
      xlarge: 0,
      xxlarge: 0,
    })
    .expect(201);

  await request(app)
    .put("/api/cart")
    .set("Cookie", cookie)
    .send({
      garmentId: new mongoose.Types.ObjectId().toHexString(),
      price: 20,
      small: 1,
      medium: 0,
      large: 1,
      xlarge: 0,
      xxlarge: 0,
    })
    .expect(201);

  const res = await request(app)
    .get("/api/cart")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.customerId).toEqual(customerId);
  expect(res.body.garments.length).toEqual(1);
});
