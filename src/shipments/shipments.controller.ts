import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { AddressDto } from '../address/dtos/address.dto';
import { RatesDto } from './dtos/rates.dto';
import { CreateShipmentDto, ShipmentType } from './dtos/shipment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserType } from 'src/address/address.controller';

@Controller('shipments')
@UseGuards(JwtAuthGuard)
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}
  @Get('rates')
  async getRates(@Body() data: RatesDto) {
    return this.shipmentsService.getRates(data);
  }
  @Post('create')
  async createShipment(@Body() data: CreateShipmentDto, @Req() req: Request & {user: UserType}) {
    return this.shipmentsService.createShipment(data, req.user.id);
  }
}
