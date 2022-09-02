import { app } from "../../app";
import request from "supertest";
import { GarmentSize, UserType } from "@mfsvton/common";
import { Cart } from "../../models/cart";
import mongoose from "mongoose";

it("error with wrong creds", async () => {
  await request(app).delete("/api/cart").send({}).expect(401);

  await request(app)
    .delete("/api/cart")
    .set("Cookie", global.signin(UserType.Admin))
    .send({})
    .expect(401);
});

it("cart not found error", async () => {
  await request(app)
    .delete("/api/cart")
    .set("Cookie", global.signin(UserType.Customer))
    .send({})
    .expect(404);
});

it("deleted successfully", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(UserType.Customer, customerId);

  const cart = Cart.build({ customerId });
  await cart.save();

  await request(app)
    .put("/api/cart")
    .set("Cookie", cookie)
    .send({
      garmentId: "adfdsaf",
      quantity: 1,
      price: 10,
      size: GarmentSize.Small,
    })
    .expect(201);

  await request(app)
    .delete("/api/cart")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const res = await request(app)
    .get("/api/cart")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.customerId).toEqual(customerId);
  expect(res.body.garments.length).toEqual(0);
});
