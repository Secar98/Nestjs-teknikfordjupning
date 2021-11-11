import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../todo.model';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async saveTodo(req): Promise<any> {
    const { userId: id } = req.user;
    const { content } = req.body;

    const newTodo = new this.todoModel({
      content,
      user: id,
    });
    const createdTodo = await newTodo.save();

    return createdTodo;
  }
}
