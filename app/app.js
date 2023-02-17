import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import loginRoutes from "../routes/login.js";
import helloWorldRoutes from "../routes/helloWorld.js";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(helloWorldRoutes);
app.use(loginRoutes);

export default app;