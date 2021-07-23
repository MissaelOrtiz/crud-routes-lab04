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
  })
  .get('/', async (req, res, next) => {
    try {
      const items = await Item.getAll();

      res.send(items);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, type } = req.body;

      const updatedItem = await Item.updateById(id, { name, type });

      res.send(updatedItem);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await Item.deleteById(id);

      res.send({ message: `${item.name} has been destroyed` });
    }catch (err) {
      next(err);
    }
  });
