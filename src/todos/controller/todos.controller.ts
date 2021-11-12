import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TodosService } from '../service/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTodo(@Param('id') todoId: string) {
    return await this.todoService.fetchTodo(todoId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTodos(@Request() req) {
    return await this.todoService.fetchTodos(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async postTodo(@Request() req) {
    return await this.todoService.saveTodo(req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async patchTodo(@Request() req) {
    return await this.todoService.updateTodo(req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteTodo(@Request() req) {
    return await this.todoService.deleteTodo(req);
  }
}
