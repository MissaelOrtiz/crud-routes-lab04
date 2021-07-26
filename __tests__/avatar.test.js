import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Avatar from '../lib/models/Avatar.js';

describe('avatar CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('creates an avatar via POST', async () => {
    const avatar = { name: 'Aang', element: 'air' };
    const res = await request(app).post('/api/v1/avatars').send(avatar);

    expect(res.body).toEqual({ id: '1', ...avatar });
  });
});
