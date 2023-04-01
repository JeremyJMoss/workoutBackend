import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import loginRoutes from "../routes/login.js";
import signupRoutes from "../routes/signup.js";
import mealsRoutes from "../routes/meals.js";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(loginRoutes);
app.use(signupRoutes);
app.use(mealsRoutes);

export default app;