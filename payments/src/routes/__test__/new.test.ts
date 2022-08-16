import mongoose from "mongoose";
import { app } from "../../app";
import request from "supertest";
import { stripe } from "../../stripe";
import { OrderStatus, UserType } from "@mfsvton/common";
import { Order } from "../../models/orders";
import { Payment } from "../../models/payments";

//it("return 404 when puchase order that does not exist", async () => {
  //await request(app)
    //.post("/api/payments")
    //.set("Cookie", global.signin(UserType.Customer))
    //.send({
      //token: "adfdaf",
      //orderId: new mongoose.Types.ObjectId().toHexString(),
    //})
    //.expect(404);
//});

//it("returns 401 when purchasing order that doesnot belong to the user", async () => {
  //const order = Order.build({
    //id: new mongoose.Types.ObjectId().toHexString(),
    //customerId: "afdsaf",
    //version: 0,
    //status: OrderStatus.Created,
    //price: 20,
  //});
  //await order.save();

  //await request(app)
    //.post("/api/payments")
    //.set("Cookie", global.signin(UserType.Customer))
    //.send({
      //token: "adfdaf",
      //orderId: order.id,
    //})
    //.expect(401);
//});

//it("return 400 when purchasing a cencelled order", async () => {
  //const customerId = new mongoose.Types.ObjectId().toHexString();
  //const orderId = new mongoose.Types.ObjectId().toHexString();

  //const order = Order.build({
    //id: orderId,
    //customerId,
    //version: 0,
    //status: OrderStatus.Cancelled,
    //price: 20,
  //});
  //await order.save();

  //await request(app)
    //.post("/api/payments")
    //.set("Cookie", global.signin(UserType.Customer, customerId))
    //.send({
      //token: "adfdaf",
      //orderId,
    //})
    //.expect(400);
//});

it("returns a 201 with valid inputs", async () => {
  const customerId = new mongoose.Types.ObjectId().toHexString();
  const orderId = new mongoose.Types.ObjectId().toHexString();
  const price = Math.floor(Math.random() * 100000);

  const order = Order.build({
    id: orderId,
    customerId,
    version: 0,
    status: OrderStatus.Created,
    price: price,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(UserType.Customer, customerId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);

  const stripeCharges = await stripe.charges.list({ limit: 50 });

  const stripeCharge = stripeCharges.data.find((charge) => {
    return charge.amount === price * 100;
  });

  expect(stripeCharge).toBeDefined();
  expect(stripeCharge!.currency).toEqual("usd");

  const payment = await Payment.findOne({
      orderId: order.id,
      stripeId: stripeCharge!.id
  })

  expect(payment).not.toBeNull();
});
