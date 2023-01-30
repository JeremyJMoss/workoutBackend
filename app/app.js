import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import loginRoutes from "../routes/login.js";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(loginRoutes);

export default app;