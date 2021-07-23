import { Router } from 'express';
import Drink from '../models/Drink';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const drink = await Drink.insert(req.body);

      res.send(drink);
    } catch (err) {
      next(err);
    }
  });
