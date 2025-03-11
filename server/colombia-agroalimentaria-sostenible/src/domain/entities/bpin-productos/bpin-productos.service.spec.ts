import { Test, TestingModule } from '@nestjs/testing';
import { BpinProductosService } from './bpin-productos.service';

describe('BpinProductosService', () => {
  let service: BpinProductosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BpinProductosService],
    }).compile();

    service = module.get<BpinProductosService>(BpinProductosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
