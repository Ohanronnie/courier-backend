import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
  imports: [], // Add your entities here
})
export class ShipmentsModule {}
