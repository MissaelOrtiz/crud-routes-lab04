import { Router } from 'express';
import Avatar from '../models/Avatar';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const avatar = await Avatar.insert(req.body);

      res.send(avatar);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const avatar = await Avatar.getById(id);

      res.send(avatar);
    } catch (err) {
      next(err);
    }
  });
