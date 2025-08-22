import express, { json } from 'express';
import productsRouter from './routes/product.routes.js';
import cors from 'cors';

const app = express();

app.use(json());
app.use(cors());
app.get('/health', (_, res) => res.send('ok'));

app.use('/products', productsRouter);

export default app;
