import { UserType } from "@mfsvton/common";
import request from "supertest";
import { app } from "../../app";

it("error with wrong creds", async () => {
  await request(app).post("/api/cart").send().expect(401);

  await request(app)
    .post("/api/cart")
    .set("Cookie", global.signin(UserType.Admin))
    .send()
    .expect(401);
});

it("error double cart", async () => {
  const cookie = global.signin(UserType.Customer);

  await request(app).post("/api/cart").set("Cookie", cookie).send().expect(201);

  await request(app).post("/api/cart").set("Cookie", cookie).send().expect(400);
});

it("good boi", async () => {
  await request(app)
    .post("/api/cart")
    .set("Cookie", global.signin(UserType.Customer))
    .send()
    .expect(201);
});
