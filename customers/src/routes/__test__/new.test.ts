import { app } from "../../app";
import request from "supertest";
import { UserType } from "@mfsvton/common";

it("error when setting customer data with out login or with admin", async () => {
  await request(app)
    .post("/api/customerdata")
    .send({
      name: "blah",
    })
    .expect(401);

  await request(app)
    .post("/api/customerdata")
    .set('Cookie', global.signin(UserType.Admin))
    .send({
      name: "blah",
    })
    .expect(401);
});

it("error when name is not added or is empty", async () => {
  await request(app)
  .post("/api/customerdata")
  .set('Cookie', global.signin(UserType.Customer))
  .send({})
  .expect(400);

  await request(app)
    .post("/api/customerdata")
    .set('Cookie', global.signin(UserType.Customer))
    .send({
      name: "",
    })
    .expect(400);
});

it("201 when customer data is right", async () => {
  await request(app)
  .post("/api/customerdata")
  .set('Cookie', global.signin(UserType.Customer))
  .send({
      name: "blah"
  })
  .expect(201);
});
