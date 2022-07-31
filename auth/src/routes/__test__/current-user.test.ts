import { UserType } from "@mfsvton/common";
import request from "supertest";
import { app } from "../../app";

it("responds with details about the current admin", async () => {
  const cookie = await global.signin(UserType.Admin);

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
  expect(response.body.currentUser.type).toEqual(UserType.Admin);
});

it("responds with details about the current customer", async () => {
  const cookie = await global.signin(UserType.Customer);

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
  expect(response.body.currentUser.type).toEqual(UserType.Customer);
});

it("responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
