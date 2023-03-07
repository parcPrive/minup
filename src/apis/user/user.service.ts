import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ createUserInput, hashedPassword: password }) {
    createUserInput.password = password;
    const user = await this.userRepository.save({
      ...createUserInput,
    });

    console.log(user);
    return user;
  }

  async check({ email }) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new ConflictException('이미 등록된 회원입니다.');
    }
  }

  async findOne({ email }) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async find() {
    return await this.userRepository.find();
  }
}
