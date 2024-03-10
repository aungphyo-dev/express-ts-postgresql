import express from 'express';
import { verifyUserToken } from '../middlewares/authenticate';
import { UsersController } from '../controllers/user.controller';
import { validator } from '../middlewares/validator';
import { updateUserSchema } from '../types/user.types';
const usersController = new UsersController();
//routes are private
export default (router: express.Router) => {
  router.get('/users', usersController.index);
  router.get('/users/:id', verifyUserToken, usersController.show);
  router.delete('/users/:id', verifyUserToken, usersController.delete);
  router.put(
    '/users/:id',
    verifyUserToken,
    validator(updateUserSchema),
    usersController.update
  );
};
