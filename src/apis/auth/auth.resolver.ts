import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { GqlRefreshGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UserService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    const user = await this.userService.findOne({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('비밀번호가 틀립니다.');
    this.authService.setRefreshToken({ user, res: context.res });
    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: any, //
  ) {
    return this.authService.getAccessToken({ user: context.req.user });
  }
}
