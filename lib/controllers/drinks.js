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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const drink = await Drink.getById(id);

      res.send(drink);
    }catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const drinks = await Drink.getAll();

      res.send(drinks);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, flavor, adult } = req.body;

      const updatedDrink = await Drink.updateById(id, { name, flavor, adult });

      res.send(updatedDrink);
    } catch (err) {
      next(err);
    }
  });
