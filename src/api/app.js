import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', routes.Main);
app.use('/products', routes.Products);

export default app;
