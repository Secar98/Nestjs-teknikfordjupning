import {
  Controller,
  Delete,
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
  @Post()
  async postTodo(@Request() req) {
    return this.todoService.saveTodo(req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async patchTodo(@Request() req) {
    return this.todoService.updateTodo(req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteTodo(@Request() req) {
    return this.todoService.deleteTodo(req);
  }
}
