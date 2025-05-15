import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { AuthService, IResponse } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  
  async register(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    const response = await this.authService.createUser(createUserDto);
    if (response.statusCode !== 201) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<IResponse> {
    const response = await this.authService.loginUser(loginUserDto);
    if (response.statusCode !== 201) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }
}
