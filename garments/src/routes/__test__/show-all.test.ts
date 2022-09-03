import { app } from "../../app";
import request from "supertest";
import { GarmentClass, Gender, UserType } from "@mfsvton/common";

it("get data of admin", async () => {
    const n = 10;
    for(let i = 0; i< n;i++) {
        await request(app)
        .post("/api/garments")
        .set("Cookie", global.signin(UserType.Admin))
        .field('name', "blah")
        .field('description', "blah")
        .field('garmentClass', GarmentClass.Shirt)
        .field('gender', Gender.Male)
        .field('price', 20)
        .field('small', 1)
        .field('medium', 1)
        .field('large', 1)
        .field('xlarge', 1)
        .field('xxlarge', 1)
        .attach('frontPhoto', global.imagePath)
        .attach('backPhoto', global.imagePath)
        .expect(201);
    }
  const {body} = await request(app).get("/api/garments").expect(200);

  expect(body.length).toEqual(n);
});
