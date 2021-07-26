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
  })
  .get('/', async (req, res, next) => {
    try {
      const avatars = await Avatar.getAll();

      res.send(avatars);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, element } = req.body;

      const updatedAvatar = await Avatar.updateById(id, { name, element });

      res.send(updatedAvatar);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const avatar = await Avatar.deleteById(id);

      res.send({ message: `${avatar.name} has been reincarnated` });
    }catch (err) {
      next(err);
    }
  });
