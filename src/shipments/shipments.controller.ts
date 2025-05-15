import { Controller, Post, Body } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { AddressDto } from '../address/dtos/address.dto';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

}
