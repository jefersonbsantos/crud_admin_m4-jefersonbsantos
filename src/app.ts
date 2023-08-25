import "express-async-errors";
import express, { Application, json } from "express";
import userRouter from "./routers/user.router";
import handleErrors from "./middlewares/handleErrors";
import sessionRouter from "./routers/session.router";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);

app.use(handleErrors);

export default app;
