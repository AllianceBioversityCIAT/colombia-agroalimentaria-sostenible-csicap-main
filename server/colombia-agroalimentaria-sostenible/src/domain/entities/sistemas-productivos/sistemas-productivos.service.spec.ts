import { Test, TestingModule } from '@nestjs/testing';
import { SistemasProductivosService } from './sistemas-productivos.service';

describe('SistemasProductivosService', () => {
  let service: SistemasProductivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SistemasProductivosService],
    }).compile();

    service = module.get<SistemasProductivosService>(SistemasProductivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
