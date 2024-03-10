import { Response, Request } from 'express';
import { createJwt, passwordHash, pgDatabase } from '../utils';
import { users } from '../models/user.service';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const hashPassword = await passwordHash(req.body.password);
      const data = await pgDatabase
        .insert(users)
        .values({ ...req.body, password: hashPassword })
        .returning({
          id: users.id,
          name: users.name,
          username: users.username,
          email: users.email,
          created_at: users.created_at,
          updated_at: users.updated_at,
        });
      return res.status(200).send({ message: 'Registration successful', data });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: 'User already existed' });
    }
  }
  async login(req: Request, res: Response) {
    const { identifier, password } = req.body;
    const [data] = await pgDatabase
      .select()
      .from(users)
      .where(or(eq(users.email, identifier), eq(users.username, identifier)));
    if (!data) return res.status(400).send({ error: 'Something went wrong!' });
    const check = await bcrypt.compare(password, data.password);
    const { password: p, ...userData } = data;
    if (!check)
      return res
        .status(400)
        .send({ message: 'Email or password does not work!' });
    return res.status(200).send({
      data: userData,
      jwt: createJwt({ p, ...userData }),
    });
  }
}
