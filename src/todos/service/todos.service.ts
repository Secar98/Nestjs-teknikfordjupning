import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../todo.model';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  // GET Todos
  // Get Todo

  async saveTodo(req): Promise<Todo> {
    try {
      const { userId: id } = req.user;
      const { content } = req.body;
      const newTodo = new this.todoModel({
        content,
        user: id,
      });
      const createdTodo = await newTodo.save();
      return createdTodo;
    } catch (error) {
      throw new BadRequestException('Failed to save todo');
    }
  }

  async updateTodo(req): Promise<Todo> {
    try {
      const { id, content } = req.body;
      const updatedTodo = await this.todoModel
        .findByIdAndUpdate(id, { content }, { new: true })
        .exec();
      return updatedTodo;
    } catch (error) {
      throw new BadRequestException('Failed to edit todo');
    }
  }

  async deleteTodo(req): Promise<any> {
    try {
      const { id } = req.body;
      const deletedTodo = this.todoModel.findByIdAndDelete(id).exec();
      return deletedTodo;
    } catch (error) {
      throw new BadRequestException('Could not delete todo');
    }
  }
}
