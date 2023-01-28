import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { ActionService } from '../action/action.service';
import { FriendsService } from '../friends/friends.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
    private actionService: ActionService,
    private friendsService: FriendsService,
  ) {
    const collection = this.connection.db.collection('users');

    collection.createIndex({ nickname: 1 }, { unique: true });
    collection.createIndex({ email: 1 }, { unique: true });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const result = await new this.userModel(createUserDto).save();
      return result;
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException(
          'User with this email or nickname already exists',
        );
      }
    }
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
      const friendships = await this.friendsService.findAllFriendshipEntities(
        id,
      );

      return Promise.all([
        this.userModel.deleteOne({ _id: id }),
        ...actions.map(({ id }) => this.actionService.remove(id)),
        ...friendships.map(({ id }) => this.friendsService.removeById(id)),
      ]);
    }
  }
}
