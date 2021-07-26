import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import foesController from './controllers/foes.js';
import itemsController from './controllers/items.js';
import drinksController from './controllers/drinks.js';
import moviesController from './controllers/movies.js';
import avatarsController from './controllers/avatars.js';

const app = express();

app.use(express.json());

app.use('/api/v1/foes', foesController);
app.use('/api/v1/items', itemsController);
app.use('/api/v1/drinks', drinksController);
app.use('/api/v1/movies', moviesController);
app.use('/api/v1/avatars', avatarsController);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
