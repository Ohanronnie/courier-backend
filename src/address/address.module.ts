import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [ UsersModule, TypeOrmModule.forFeature([Address, User]), AuthModule], // Add your entities here
})
export class AddressModule {}
