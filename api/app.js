import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/main', routes.Main);
app.use('/', routes.Products);

export default app;
