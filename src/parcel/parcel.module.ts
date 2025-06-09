import { Module } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelController } from './parcel.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcel, ParcelItem } from './entities/parcel.entity';
import { Packaging } from './entities/packaging.entity';

@Module({
  controllers: [ParcelController],
  providers: [ParcelService],
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([Parcel, ParcelItem, Packaging]),
  ], // Add your entities here
})
export class ParcelModule {}
