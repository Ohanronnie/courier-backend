import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AddressModule } from 'src/address/address.module';
import { Shipment } from './entities/shipments.entity';
import { User } from 'src/users/entities/user.entity';
import { Parcel } from 'src/parcel/entities/parcel.entity';
import { Address } from 'src/address/entities/address.entity';
import { ParcelModule } from 'src/parcel/parcel.module';

@Module({
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
  imports: [
    UsersModule,
    AuthModule,
    AddressModule,
    ParcelModule,
    TypeOrmModule.forFeature([Shipment, User, Parcel, Address]),
  ], // Add your entities here
})
export class ShipmentsModule {}
