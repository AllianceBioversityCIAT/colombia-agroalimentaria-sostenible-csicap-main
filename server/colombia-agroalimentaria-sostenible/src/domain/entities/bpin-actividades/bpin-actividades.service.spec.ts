import { Test, TestingModule } from '@nestjs/testing';
import { BpinActividadesService } from './bpin-actividades.service';

describe('BpinActividadesService', () => {
  let service: BpinActividadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BpinActividadesService],
    }).compile();

    service = module.get<BpinActividadesService>(BpinActividadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
