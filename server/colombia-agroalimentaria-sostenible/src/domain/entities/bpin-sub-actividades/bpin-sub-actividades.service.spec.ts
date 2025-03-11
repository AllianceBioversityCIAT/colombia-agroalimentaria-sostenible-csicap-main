import { Test, TestingModule } from '@nestjs/testing';
import { BpinSubActividadesService } from './bpin-sub-actividades.service';

describe('BpinSubActividadesService', () => {
  let service: BpinSubActividadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BpinSubActividadesService],
    }).compile();

    service = module.get<BpinSubActividadesService>(BpinSubActividadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
