import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActionService } from '../action/action.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private actionService: ActionService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  async findByNickname(nickname: string) {
    try {
      const result = this.userModel.find({ nickname });
      return result;
    } catch {
      return [];
    }
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (user) {
      const actions = await this.actionService.findAllByUserId(id);
      return Promise.all([
        this.userModel.deleteOne({ _id: id }),
        ...actions.map(({ id }) => this.actionService.remove(id)),
      ]);
    }
  }
}
