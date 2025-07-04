import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import * as bcrypt from 'bcryptjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
