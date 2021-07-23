import { Router } from 'express';
import Item from '../models/Item';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const item = await Item.insert(req.body);

      res.send(item);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await Item.getById(id);

      res.send(item);
    } catch (err) {
      next(err);
    }
  });