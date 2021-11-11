import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TodosService } from '../service/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@Request() req: Object) {
    return this.todoService.saveTodo(req);
  }
}
