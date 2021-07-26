import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Movie from '../lib/models/Movie';

describe('movie CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a movie via POST', async () => {
    const movie = { name: 'finding nemo', genre: 'animated/family' };
    const res = await request(app).post('/api/v1/movies').send(movie);

    expect(res.body).toEqual({ id: '1', ...movie });
  });

  it('gets a movie by id via GET', async () => {
    const movie = await Movie.insert({ name: 'finding nemo', genre: 'animated/family' });
    const res = await request(app).get(`/api/v1/movies/${movie.id}`);

    expect(res.body).toEqual(movie);
  });

  it('gets all movies via GET', async () => {
    const movie1 = await Movie.insert({ name: 'The Ring', genre: 'horro' });
    const movie2 = await Movie.insert({ name: 'Night of the Living Dead', genre: 'horro' });
    const res = await request(app).get('/api/v1/movies');

    expect(res.body).toEqual([movie1, movie2]);
  });
});
