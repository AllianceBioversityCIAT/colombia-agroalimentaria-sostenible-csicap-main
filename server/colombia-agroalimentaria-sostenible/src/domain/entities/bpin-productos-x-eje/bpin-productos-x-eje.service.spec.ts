import { Test, TestingModule } from '@nestjs/testing';
import { BpinProductosXEjeService } from './bpin-productos-x-eje.service';

describe('BpinProductosXEjeService', () => {
  let service: BpinProductosXEjeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BpinProductosXEjeService],
    }).compile();

    service = module.get<BpinProductosXEjeService>(BpinProductosXEjeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
