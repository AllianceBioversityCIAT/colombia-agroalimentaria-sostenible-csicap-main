import { Test, TestingModule } from '@nestjs/testing';
import { GcfEjesService } from './gcf-ejes.service';

describe('GcfEjesService', () => {
  let service: GcfEjesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcfEjesService],
    }).compile();

    service = module.get<GcfEjesService>(GcfEjesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
