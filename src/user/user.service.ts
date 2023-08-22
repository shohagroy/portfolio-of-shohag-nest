import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDoc } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDoc> {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);

    const result = await this.userModel.create(createUserDto);
    return result;
  }

  async findOne(email: string): Promise<UserDoc | null> {
    const result = await this.userModel.findOne({ email });

    return result;
  }
  async findAll(): Promise<UserDoc[] | null> {
    const result = await this.userModel.find();

    return result;
  }
}
