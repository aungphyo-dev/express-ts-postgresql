import { Request, Response } from 'express';
import { pgDatabase } from '../utils';
import { users } from '../models/user.service';
import { asc, desc, eq } from 'drizzle-orm';

const ReturnObject = {
  id: users.id,
  email: users.email,
  username: users.username,
  name: users.name,
  created_at: users.created_at,
  updated_at: users.updated_at,
};
export class UsersController {
  constructor() {
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  async index(req: Request, res: Response) {
    try {
      const { offset = 0, limit = 20, sort = 'asc' } = req.query;
      const data = await pgDatabase
        .select(ReturnObject)
        .from(users)
        .offset(+offset)
        .limit(+limit)
        .orderBy(sort === 'desc' ? desc(users.id) : asc(users.id));
      return res.status(200).json({
        message: 'Users retrieve successfully!',
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'Something went wrong!' });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const [data] = await pgDatabase
      .select(ReturnObject)
      .from(users)
      .where(eq(users.id, +id))
      .execute();
    if (!data) return res.status(404).json({ error: 'User not found!' });
    return res.status(200).json({
      message: 'User retrieve successfully!',
      data,
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (!req.body) {
      return res.status(400).json({ error: 'Body Required!' });
    }
    const [data] = await pgDatabase
      .update(users)
      .set({ ...req.body, updated_at: new Date() })
      .where(eq(users.id, +id))
      .returning(ReturnObject);
    if (!data) return res.status(400).json({ error: 'Something went wrong!' });
    return res.status(200).json({ message: 'Update user successfully!', data });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const [deletedUser] = await pgDatabase
      .delete(users)
      .where(eq(users.id, +id))
      .returning();
    if (!deletedUser)
      return res.status(400).json({ error: 'Something went wrong!' });
    return res.status(204).json({});
  }
}
