import { app } from "../../app";
import request from "supertest";
import { UserType } from "@mfsvton/common";
import { Cart } from "../../models/cart";
import mongoose from "mongoose";

it("error with wrong creds", async () => {
  await request(app).get("/api/cart").send({}).expect(401);

  await request(app)
    .get("/api/cart")
    .set("Cookie", global.signin(UserType.Admin))
    .send({})
    .expect(401);
});

it("cart not found error", async () => {
  await request(app)
    .get("/api/cart")
    .set("Cookie", global.signin(UserType.Customer))
    .send({})
    .expect(404);
});

it("showed successfully", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);

  const cart = Cart.build({ customerId });
  await cart.save();

  const res = await request(app)
    .get("/api/cart")
    .set("Cookie", cookie)
    .send()
    .expect(200);

    expect(res.body.customerId).toEqual(customerId)
});
