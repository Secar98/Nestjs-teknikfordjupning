import { Module } from '@nestjs/common';
import { TodosService } from './service/todos.service';
import { TodosController } from './controller/todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './todo.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
