import { Body, Controller, Get, Param, Post, Put, Query, UseInterceptors, UsePipes, } from '@nestjs/common';
import { UserService } from './services/user.service';
import { GetContext } from '@app/shared/context/context.decorator';
import { Context } from '@app/shared/context/context';
import { GetUsersPayload } from '@app/rest/user/models/get-users.payload';
import { PageableResponse } from '@app/shared/pageable-response/pageable-response';
import { User } from '@app/entity/user.entity';
import { UserIdParam } from '@app/rest/user/models/user-id.param';
import { Validate } from '@app/shared/validation/validate.pipe';
import { RegisterUserByCredentialsPayload } from '@app/rest/user/models/register-user-by-credentials.payload';
import { RegisterUserResponse } from '@app/rest/user/models/register-user.response';
import { TransformResponseInterceptor } from '@app/shared/transform-response.interceptor';
import { RoleEnum } from '@app/shared/role/role.enum';
import { UpdateUserPayload } from '@app/rest/user/models/update-user.payload';
import { Public } from '@app/shared/public-endpoint.decorator';
import { GetUserNameAvailabilityPayload } from '@app/rest/user/models/get-user-name-availability.payload';
import { GetUserNameAvailabilityResponse } from '@app/rest/user/models/get-user-name-availability.response';
import { Roles } from '@app/shared/security/roles.decorator';
import { UserRegistrationByCredentialsService } from '@app/rest/user/services/user-registration-by-credentials.service';

@Controller('users')
@UseInterceptors(TransformResponseInterceptor)
@UsePipes(Validate())
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRegistrationByCredentialsService: UserRegistrationByCredentialsService,
  ) {
  }

  @Get()
  @Roles(RoleEnum.administrator)
  getUsers(
    @GetContext() context: Context,
    @Query() getUsersPayload: GetUsersPayload,
  ): Promise<PageableResponse<User>> {
    return this.userService.getUsers(getUsersPayload);
  }

  @Post('registration/credentials')
  @Public()
  async registerUserByCredentials(
    @Body() payload: RegisterUserByCredentialsPayload,
  ): Promise<RegisterUserResponse> {
    return this.userRegistrationByCredentialsService.registerUser(payload);
  }

  @Get('username-availability')
  @Public()
  async getUserNameAvailability(
    @Query() params: GetUserNameAvailabilityPayload,
  ): Promise<GetUserNameAvailabilityResponse> {
    return this.userService.getUserNameAvailability(params);
  }

  @Get(':userId')
  @Roles(RoleEnum.administrator)
  async getUser(
    @Param() userIdParam: UserIdParam,
    @GetContext() context: Context,
  ): Promise<User> {
    return this.userService.getUser(userIdParam.userId);
  }

  @Put(':userId')
  @Roles(RoleEnum.administrator)
  async updateUser(
    @Param() userIdParam: UserIdParam,
    @GetContext() context: Context,
    @Body() payload: UpdateUserPayload,
  ): Promise<User> {
    return this.userService.updateUser(userIdParam.userId, payload);
  }
}
