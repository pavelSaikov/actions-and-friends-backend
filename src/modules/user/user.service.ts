import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';

import { ActionService } from '../action/action.service';
import { FriendsService } from '../friends/friends.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas';
import { ConfigKey } from 'src/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
    private actionService: ActionService,
    private friendsService: FriendsService,
    private configService: ConfigService,
  ) {
    const collection = this.connection.db.collection('users');

    collection.createIndex({ nickname: 1 }, { unique: true });
    collection.createIndex({ email: 1 }, { unique: true });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      // const hashedPassword = await this.hashPassword(createUserDto.password);

      const result = await new this.userModel({
        ...createUserDto,
        // password: hashedPassword,
      }).save();

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

      await Promise.all([
        this.userModel.deleteOne({ _id: id }),
        ...actions.map(({ id }) => this.actionService.remove(id)),
        ...friendships.map(({ userId, friendId }) =>
          this.friendsService.removeById(userId, friendId),
        ),
      ]);

      return id;
    }
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  comparePasswordWithOriginal(
    originalPassword: string,
    password: string,
  ): Promise<boolean> {
    return Promise.resolve(originalPassword === password);
    // return bcrypt.compare(password, originalPassword);
  }

  async checkUserExistenceByIdAndEmail(
    id: string,
    email: string,
  ): Promise<boolean> {
    const user = await this.findOne(id);

    return user && user.email === email;
  }

  // private hashPassword(originalPassword: string): Promise<string> {
  //   return bcrypt.hash(
  //     originalPassword,
  //     Number(this.configService.get<string>(ConfigKey.HashRounds)),
  //   );
  // }
}
