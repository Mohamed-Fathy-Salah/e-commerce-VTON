import "express-async-errors";
import { currentUser, errorHandler, NotFoundError } from "@mfsvton/common";
import cookieSession from "cookie-session";
import express from "express";
import { json } from "body-parser";

import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    //secure: process.env.NODE_ENV !== "test",
     secure: false
  })
);

app.use(currentUser);

app.use(createChargeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
