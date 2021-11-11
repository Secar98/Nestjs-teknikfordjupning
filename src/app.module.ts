import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URI } from 'env';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [MongooseModule.forRoot(DB_URI), UsersModule, AuthModule, TodosModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
