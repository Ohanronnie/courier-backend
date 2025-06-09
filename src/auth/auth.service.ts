import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { ICreateUser } from './dto/register.dto';
import { ILoginUser } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
export interface IResponse {
  statusCode: HttpStatus;
  message: string | string[];
  data?: any;
  error?: string;
}
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(user: ICreateUser): Promise<IResponse> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (existingUser) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['Email already exists'],
          error: 'Email already exists',
        };
      }

      const existingPhone = await this.userRepository.findOneBy({
        phone: user.phone,
      });
      if (existingPhone) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['Phone already exists'],
          error: 'Phone already exists',
        };
      }
      const newUser = this.userRepository.create({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        phone: user.phone,
      });
      await this.userRepository.save(newUser);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        data: null,
      };
    } catch (error: any) {
      console.error('Error creating user:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }
  async loginUser(user: ILoginUser): Promise<IResponse> {
    try {
      const existingUser = await this.userRepository.findOneBy({
        email: user.email,
      });
      if (!existingUser) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'User not found',
          error: 'Invalid credentials',
        };
      }
      const isPasswordValid = bcrypt.compareSync(
        user.password,
        existingUser.password,
      );
      if (!isPasswordValid) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Wrong password',
          error: 'Invalid credentials',
        };
      }
      const payload = {
        email: existingUser.email,
        id: existingUser.id,
      };
      const token = this.jwtService.sign(payload);

      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: {
          token,
        },
      };
    } catch (error: any) {
      console.error('Error logging in user:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }
}
