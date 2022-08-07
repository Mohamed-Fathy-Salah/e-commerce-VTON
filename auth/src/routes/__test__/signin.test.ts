import { UserType } from "@mfsvton/common";
import request from "supertest";
import { app } from "../../app";

it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
      type: UserType.Admin,
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({
      name: "hi",
      email: "test@test.com",
      password: "password",
      type: UserType.Admin,
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "aslkdfkdfj",
      type: UserType.Admin,
    })
    .expect(400);
});

it("fails when an incorrect type is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "hi",
      email: "test@test.com",
      password: "password",
      type: UserType.Admin,
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
      type: UserType.Customer,
    })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "hi",
      email: "test@test.com",
      password: "password",
      type: UserType.Admin,
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
      type: UserType.Admin,
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
