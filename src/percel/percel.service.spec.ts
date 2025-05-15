import { Test, TestingModule } from '@nestjs/testing';
import { PercelService } from './percel.service';

describe('PercelService', () => {
  let service: PercelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PercelService],
    }).compile();

    service = module.get<PercelService>(PercelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
