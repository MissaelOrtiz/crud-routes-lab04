import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Foe from '../lib/models/Foe.js';

describe('foe CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a foe via POST', async () => {
    const foe = { name: 'goblin', level: 1 };
    const res = await request(app).post('/api/v1/foes').send(foe);

    expect(res.body).toEqual({ id: '1', ...foe });
  });
});
