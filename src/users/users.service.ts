import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signUser(req) {
    const { email, name, password } = req.body;
    const user = await this.userModel.exists({ email });
    if (user) {
      throw new BadRequestException('Email Taken');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    const { id } = await newUser.save();
    return { id: id };
  }

  async loginUser(email: string, pass: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Wrong email or password');
    }

    const isMatch = bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new BadRequestException('Wrong email or password');
    }

    return user;
  }
}
