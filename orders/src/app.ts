import "express-async-errors";
import { currentUser, errorHandler, NotFoundError } from "@mfsvton/common";
import cookieSession from "cookie-session";
import express from "express";
import { json } from "body-parser";

import { newOrderRouter } from "./routes/new";
import { showAllOrdersRouter } from "./routes/show-all";
import { showOrderRouter } from "./routes/show";
import { deleteOrderRouter } from "./routes/delete";

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

app.use(currentUser);

app.use(newOrderRouter)
app.use(showOrderRouter)
app.use(showAllOrdersRouter)
app.use(deleteOrderRouter)

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
