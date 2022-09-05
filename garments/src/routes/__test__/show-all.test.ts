import { app } from "../../app";
import request from "supertest";
import { GarmentClass, Gender, UserType } from "@mfsvton/common";

it("get all garments", async () => {
  const n = 3;
  const cookie = global.signin(UserType.Admin);
  for (let i = 0; i < n; i++) {
    await request(app)
      .post("/api/garments")
      .set("Cookie", cookie)
      .field("name", "blah")
      .field("description", "blah")
      .field("garmentClass", GarmentClass.Shirt)
      .field("gender", Gender.Male)
      .field("price", 20)
      .field("small", 1)
      .field("medium", 1)
      .field("large", 1)
      .field("xlarge", 1)
      .field("xxlarge", 1)
      .attach("frontPhoto", global.imagePath)
      .attach("backPhoto", global.imagePath)
      .expect(201);
  }

  const { body } = await request(app)
    .get("/api/garments")
    .set("Cookie", cookie)
    .expect(200);

  expect(body.length).toEqual(n);
});

it("get cart", async () => {
  const n = 5;
  const cookie = global.signin(UserType.Admin);
  const garmentId = [];

  for (let i = 0; i < n; i++) {
    const res = await request(app)
      .post("/api/garments")
      .set("Cookie", cookie)
      .field("name", "blah")
      .field("description", "blah")
      .field("garmentClass", GarmentClass.Shirt)
      .field("gender", Gender.Male)
      .field("price", 20)
      .field("small", 1)
      .field("medium", 1)
      .field("large", 1)
      .field("xlarge", 1)
      .field("xxlarge", 1)
      .attach("frontPhoto", global.imagePath)
      .attach("backPhoto", global.imagePath)
      .expect(201);
      
      if((i & 1) === 1) {
          garmentId.push(res.body.id);
      }
  }

  const ids = Buffer.from(JSON.stringify(garmentId.map(val => ({garmentId: val}))), 'ascii').toString("base64");
  cookie.push(`cart=${ids}`);

  const { body } = await request(app)
    .get("/api/garments?cart=1")
    .set("Cookie", cookie)
    .expect(200);

  expect(body.length).toEqual(2);
});

