import { Test, TestingModule } from '@nestjs/testing';
import { BpinObjetivosService } from './bpin-objetivos.service';

describe('BpinObjetivosService', () => {
  let service: BpinObjetivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BpinObjetivosService],
    }).compile();

    service = module.get<BpinObjetivosService>(BpinObjetivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
