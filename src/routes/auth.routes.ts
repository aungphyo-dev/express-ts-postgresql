import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validator } from '../middlewares/validator';
import { createUserSchema, loginUserSchema } from '../types/user.types';
const authController = new AuthController();
//routes are private
export default (router: express.Router) => {
  router.post(
    '/auth/register',
    validator(createUserSchema),
    authController.register
  );
  router.post('/auth/login', validator(loginUserSchema), authController.login);
};
