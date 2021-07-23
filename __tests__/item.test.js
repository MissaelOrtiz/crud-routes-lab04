import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Item from '../lib/models/Item.js';

describe('item CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an item via POST', async () => {
    const item = { name: 'sword of flames', type: 'weapon' };
    const res = await request(app).post('/api/v1/items').send(item);

    expect(res.body).toEqual({ id: '1', ...item });
  });
});
