import "express-async-errors";
import { currentUser, errorHandler, NotFoundError } from "@mfsvton/common";
import cookieSession from "cookie-session";
import express from "express";
import { json } from "body-parser";
import { showDataRouter } from "./routes/show-data";
import { indexOrderRouter } from "./routes/index-order";
import { ShowOrdersRouter } from "./routes/show-orders";
import { updateRouter } from "./routes/update";

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

app.use(ShowOrdersRouter);
app.use(updateRouter);
app.use(indexOrderRouter);
app.use(showDataRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
