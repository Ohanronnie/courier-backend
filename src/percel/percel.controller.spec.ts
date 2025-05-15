import { Test, TestingModule } from '@nestjs/testing';
import { PercelController } from './percel.controller';
import { PercelService } from './percel.service';

describe('PercelController', () => {
  let controller: PercelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PercelController],
      providers: [PercelService],
    }).compile();

    controller = module.get<PercelController>(PercelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
