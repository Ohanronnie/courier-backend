import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShipmentsModule } from './shipments/shipments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Address } from './address/entities/address.entity';
import { AddressModule } from './address/address.module';
import { ParcelModule } from './parcel/parcel.module';
import { Parcel, ParcelItem } from './parcel/entities/parcel.entity';
import { Packaging } from './parcel/entities/packaging.entity';
import { Shipment } from './shipments/entities/shipments.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          synchronize: true,
          logging: true,
          entities: [User, Address, Parcel, ParcelItem, Packaging, Shipment],
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ShipmentsModule,
    AddressModule,
    ParcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
