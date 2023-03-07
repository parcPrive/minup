import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/craeteUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    await this.userService.check({ email: createUserInput.email });
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    return this.userService.create({ createUserInput, hashedPassword });
  }

  @Query(() => User)
  fetchUser(
    @Args('email') email: string, //
  ) {
    return this.userService.findOne({ email });
  }

  @Query(() => [User])
  async fetchUsers() {
    return this.userService.find();
  }
}
