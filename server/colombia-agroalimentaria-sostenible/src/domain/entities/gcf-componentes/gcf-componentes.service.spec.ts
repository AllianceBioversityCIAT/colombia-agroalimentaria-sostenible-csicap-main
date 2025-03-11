import { Test, TestingModule } from '@nestjs/testing';
import { GcfComponentesService } from './gcf-componentes.service';

describe('GcfComponentesService', () => {
  let service: GcfComponentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcfComponentesService],
    }).compile();

    service = module.get<GcfComponentesService>(GcfComponentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
