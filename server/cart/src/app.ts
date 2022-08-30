import "express-async-errors";
import { currentUser, errorHandler, NotFoundError } from "@mfsvton/common";
import cookieSession from "cookie-session";
import express from "express";
import { json } from "body-parser";

import { newCartRouter } from "./routes/new";
import { updateCartRouter } from "./routes/update";
import { showCartRouter } from "./routes/show";
import { deleteCartRouter } from "./routes/delete";

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

app.use(newCartRouter)
app.use(showCartRouter)
app.use(deleteCartRouter)
app.use(updateCartRouter)

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
