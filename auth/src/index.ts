import express from "express";
import { signupRouter } from "./routes/signup";
import { json } from "body-parser";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(signupRouter);

app.listen(3000, () => {
  console.log("listening on port 3000!!");
});
