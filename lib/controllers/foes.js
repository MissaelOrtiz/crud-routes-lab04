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
  });
