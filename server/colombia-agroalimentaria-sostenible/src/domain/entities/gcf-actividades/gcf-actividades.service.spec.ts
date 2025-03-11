import { Test, TestingModule } from '@nestjs/testing';
import { GcfActividadesService } from './gcf-actividades.service';

describe('GcfActividadesService', () => {
  let service: GcfActividadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcfActividadesService],
    }).compile();

    service = module.get<GcfActividadesService>(GcfActividadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
