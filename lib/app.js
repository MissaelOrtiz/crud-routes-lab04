import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import foesController from './controllers/foes.js';
import itemsController from './controllers/items.js';

const app = express();

app.use(express.json());

app.use('/api/v1/foes', foesController);
app.use('/api/v1/items', itemsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
