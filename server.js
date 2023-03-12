import app from './app/app.js';
import { PORT } from './config/config.js';

const port = PORT

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
