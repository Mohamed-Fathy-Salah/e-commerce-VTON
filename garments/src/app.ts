import "express-async-errors";
import { currentUser, errorHandler, NotFoundError } from "@mfsvton/common";
import cookieSession from "cookie-session";
import express from "express";
import { json } from "body-parser";

import { newGarmentsRouter } from "./routes/new";
import { updateGarmentsRouter } from "./routes/update";
import { showGarmentsRouter } from "./routes/show";
import { deleteGarmentsRouter } from "./routes/delete";
import { showAllGarmentsRouter } from "./routes/show-all";
import { indexGarmentsRouter } from "./routes";

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

app.use(newGarmentsRouter);
app.use(updateGarmentsRouter);
app.use(showGarmentsRouter);
app.use(showAllGarmentsRouter);
app.use(indexGarmentsRouter);
app.use(deleteGarmentsRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
