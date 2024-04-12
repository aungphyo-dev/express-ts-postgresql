import { Response, Request } from 'express';
import { createJwt, passwordHash, prisma } from '../utils';
import bcrypt from 'bcrypt';


export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const hashPassword = await passwordHash(req.body.password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password,...user} = await prisma.user.create({
        data : {...req.body,password : hashPassword}
      })
      return res.status(200).send({ message: 'Registration successful', user });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: 'User already existed' });
    }
  }
  async login(req: Request, res: Response) {
    const { email , password }  = req.body;
    const data = await prisma.user.findUnique({
      where: { email }
    })
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
