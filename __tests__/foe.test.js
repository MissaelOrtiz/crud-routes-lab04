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

  it('gets a foe by id via GET', async () => {
    const foe = await Foe.insert({ name: 'goblin', level: 1 });
    const res = await request(app).get(`/api/v1/foes/${foe.id}`);

    expect(res.body).toEqual(foe);
  });

  it('gets all foes via GET', async () => {
    const foe1 = await Foe.insert({ name: 'goblin', level: 1 });
    const foe2 = await Foe.insert({ name: 'hobgoblin', level: 2 });
    const foe3 = await Foe.insert({ name: 'dire wolf', level: 3 });
    const res = await request(app).get('/api/v1/foes');

    expect(res.body).toEqual([foe1, foe2, foe3]);
  });
});
