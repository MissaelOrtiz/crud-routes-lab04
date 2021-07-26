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

  it('gets an avatar by id via GET', async () => {
    const avatar = await Avatar.insert({ name: 'Aang', element: 'air' });
    const res = await request(app).get(`/api/v1/avatars/${avatar.id}`);

    expect(res.body).toEqual(avatar);
  });

  it('gets all avatars via GET', async () => {
    const avatar1 = await Avatar.insert({ name: 'Aang', element: 'air' });
    const avatar2 = await Avatar.insert({ name: 'Korra', element: 'water' });
    const res = await request(app).get('/api/v1/avatars');

    expect(res.body).toEqual([avatar1, avatar2]);
  });

  it('updates an item by id via PUT', async () => {
    const correct = { name: 'Aang', element: 'air' };
    const avatar = await Avatar.insert({ name: 'TAang', element: 'fire' });
    const res = await request(app).put(`/api/v1/avatars/${avatar.id}`).send(correct);

    expect(res.body).toEqual({ id: '1', ...correct });
  });

  it('deletes an avatar by id via DELETE', async () => {
    const avatar = await Avatar.insert({ name: 'TAang', element: 'fire' });
    const res = await request(app).delete(`/api/v1/avatars/${avatar.id}`);

    expect(res.body).toEqual({ message: `${avatar.name} has been reincarnated` });
  });
});
