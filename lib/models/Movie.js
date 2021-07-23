import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Movie from '../lib/models/Movie.js';

describe('movei CRUD routes', async () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a movie via POST', async () => {
    const movie = { name: 'finding nemo', genre: 'animated/family' };
    const res = await request(app).post('/api/v1/movies').send(movie);

    expect(res.body).toEqual({ id: '1', ...movie });
  });
});
