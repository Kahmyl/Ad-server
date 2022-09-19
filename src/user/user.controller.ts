import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {
  successResponse,
  SuccessResponseType,
} from 'src/common/utils/response';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { CreateUserService } from './services/create-user.service';
import { LoginUserService } from './services/login-user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginUserService: LoginUserService,
  ) {}

  @Post('create')
  @HttpCode(201)
  async createUser(@Body() data: CreateUserDto): Promise<SuccessResponseType> {
    const result = await this.createUserService.execute(data);
    return successResponse({
      message: 'Account created successfully',
      data: result,
      code: HttpStatus.OK,
      status: 'success',
    });
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() data: LoginDto): Promise<SuccessResponseType> {
    const result = await this.loginUserService.execute(data);
    return successResponse({
      message: 'User logged in successfully',
      data: result,
      code: HttpStatus.OK,
      status: 'success',
    });
  }
}
