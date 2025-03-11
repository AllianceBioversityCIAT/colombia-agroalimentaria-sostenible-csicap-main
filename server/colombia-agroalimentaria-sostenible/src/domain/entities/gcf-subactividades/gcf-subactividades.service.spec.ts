import { Test, TestingModule } from '@nestjs/testing';
import { GcfSubactividadesService } from './gcf-subactividades.service';

describe('GcfSubactividadesService', () => {
  let service: GcfSubactividadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcfSubactividadesService],
    }).compile();

    service = module.get<GcfSubactividadesService>(GcfSubactividadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
