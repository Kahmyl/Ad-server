import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import {
  successResponse,
  SuccessResponseType,
} from 'src/common/utils/response';
import { CreateBrandDto } from './dto/create-brand.dto';
import { LoginBrandDto } from './dto/login-brand.dto';
import { CreateBrandService } from './services/create-brand.service';
import { LoginBrandService } from './services/login-brand.service';

@Controller('brand')
export class BrandController {
  constructor(
    private readonly createBrandService: CreateBrandService,
    private readonly loginBrandService: LoginBrandService,
  ) {}

  @Post('create')
  @HttpCode(201)
  async createUser(@Body() data: CreateBrandDto): Promise<SuccessResponseType> {
    const result = await this.createBrandService.execute(data);
    return successResponse({
      message: 'Account created successfully',
      data: result,
      code: HttpStatus.OK,
      status: 'success',
    });
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() data: LoginBrandDto): Promise<SuccessResponseType> {
    const result = await this.loginBrandService.execute(data);
    return successResponse({
      message: 'Brand logged in successfully',
      data: result,
      code: HttpStatus.OK,
      status: 'success',
    });
  }
}
