import { Router } from 'express';
import Foe from '../models/Foe';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const foe = await Foe.insert(req.body);

      res.send(foe);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const foe = await Foe.getById(id);

      res.send(foe);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const foes = await Foe.getAll();

      res.send(foes);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, level } = req.body;

      const updatedFoe = await Foe.updateById(id, { name, level });

      res.send(updatedFoe);
    } catch (err) {
      next(err);
    }
  });
