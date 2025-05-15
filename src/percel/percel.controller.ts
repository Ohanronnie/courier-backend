import { Controller } from '@nestjs/common';
import { PercelService } from './percel.service';

@Controller('percel')
export class PercelController {
  constructor(private readonly percelService: PercelService) {}
}
