import { errorHandler, NotFoundError } from "@mfsvton/common";
import cookieSession from "cookie-session";
import express, { json } from "express";
import { signupRouter } from "./routes/signup";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
    // secure: false
  })
);

app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
