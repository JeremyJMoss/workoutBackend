import dotenv from "dotenv";
import app from './app/app.js';

dotenv.config();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
