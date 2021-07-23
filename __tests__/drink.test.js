import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Drink from '../lib/models/Drink.js';

describe('drink CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a drink via POST', async () => {
    const drink = { name: 'mead', flavor: 'sweet', adult: true };
    const res = await request(app).post('/api/v1/drinks').send(drink);

    expect(res.body).toEqual({ id: '1', ...drink });
  });

  it('gets a drink by id via GET', async () => {
    const drink = await Drink.insert({ name: 'mead', flavor: 'sweet', adult: true });
    const res = await request(app).get(`/api/v1/drinks/${drink.id}`);

    expect(res.body).toEqual(drink);
  });

  it('gets all drinks via GET', async () => {
    const drink1 = await Drink.insert({ name: 'mead', flavor: 'sweet', adult: true });
    const drink2 = await Drink.insert({ name: 'orange juice', flavor: 'sweet/tart', adult: false });
    const drink3 = await Drink.insert({ name: 'water', flavor: 'neutral', adult: false });
    const res = await request(app).get('/api/v1/drinks');

    expect(res.body).toEqual([drink1, drink2, drink3]);
  });
});
