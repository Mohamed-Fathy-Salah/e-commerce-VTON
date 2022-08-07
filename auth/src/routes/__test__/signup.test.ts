import { UserType } from "@mfsvton/common";
import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "blah",
      email: "test@test.com",
      password: "password",
      type: UserType.Admin,
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "blah",
      email: "alskdflaskjfd",
      password: "password",
      type: UserType.Admin,
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "adf",
      email: "alskdflaskjfd",
      password: "p",
      type: UserType.Customer,
    })
    .expect(400);
});

it("returns a 400 with an invalid type", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "dasf",
      email: "test@test.com",
      password: "password",
      type: "blah",
    })
    .expect(400);
});

it("returns a 400 with missing name and email and password and type", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      type: UserType.Customer,
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "alskjdf",
      type: UserType.Customer,
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "alskjdf",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "hi",
      email: "test@test.com",
      password: "password",
      type: UserType.Customer,
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      name: "bye",
      email: "test@test.com",
      password: "password",
      type: UserType.Customer,
    })
    .expect(400);
});

it("allows same email to be defined on admin and user", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "hi",
      email: "test@test.com",
      password: "password",
      type: UserType.Customer,
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      name: "bye",
      email: "test@test.com",
      password: "password",
      type: UserType.Admin,
    })
    .expect(201);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      name: "hi",
      email: "test@test.com",
      password: "password",
      type: UserType.Customer,
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
