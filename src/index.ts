import express from "express";
import dotenv from "dotenv";
import { router } from "./routes.ts";

dotenv.config();

const app = express();

app.use(express.json());
app.use(router);

export { app };
