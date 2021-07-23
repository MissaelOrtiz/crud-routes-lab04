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

  it('gets an item by id via GET', async () => {
    const item = await Item.insert({ name: 'sword of flames', type: 'weapon ' });
    const res = await request(app).get(`/api/v1/items/${item.id}`);

    expect(res.body).toEqual(item);
  });

  it('gets all items via GET', async () => {
    const item1 = await Item.insert({ name: 'sword of flames', type: 'weapon' });
    const item2 = await Item.insert({ name: 'ring of cryos', type: 'ring' });
    const res = await request(app).get('/api/v1/items');

    expect(res.body).toEqual([item1, item2]);
  });

  it('updates an item by id via PUT', async () => {
    const star = { name: 'sword of stars', type: 'sword' };
    const item = await Item.insert({ name: 'sword of flames', type: 'weapon' });
    const res = await (await request(app).put(`/api/v1/items/${item.id}`)).setEncoding(star);

    expect(res.body).toEqual({ id: '1', ...star });
  });
});
