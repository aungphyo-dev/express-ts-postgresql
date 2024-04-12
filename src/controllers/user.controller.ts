import { Request, Response } from 'express';
import { prisma } from '../utils';
export class UsersController {
  constructor() {
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  async index(req: Request, res: Response) {
    try {
      const { page = 1, pageSize = 20, sort = 'asc' } = req.query;
      const totalCounts = await prisma.user.count()
      const data = await prisma.user.findMany({
        skip : (+page - 1) * +pageSize,
        take : +pageSize,
        orderBy : [{id : sort === "asc" ? "asc" : "desc"}],
        select :{
          password : false,
          id : true,
          name : true,
          username : true,
          email : true,
          updatedAt : true,
          createdAt : true
        }
      })
      return res.status(200).json({
        message: 'Users retrieve successfully!',
        totalCounts,
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'Something went wrong!' });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const data = await prisma.user.findUnique({
      where : {
        id : +id
      }
    });
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
    try{
      await prisma.user.update({
        where : { id : +id},
        data : req.body
      })
      return res.status(200).json({ message: 'Update user successfully!'});
    }catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong!' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try{
      await prisma.user.delete({
        where : {
          id : +id
        }
      })
      return res.sendStatus(204)
    }catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong!' });
    }
  }
}
