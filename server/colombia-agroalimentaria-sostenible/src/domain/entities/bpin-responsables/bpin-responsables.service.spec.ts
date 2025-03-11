import { Test, TestingModule } from '@nestjs/testing';
import { BpinResponsablesService } from './bpin-responsables.service';

describe('BpinResponsablesService', () => {
  let service: BpinResponsablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BpinResponsablesService],
    }).compile();

    service = module.get<BpinResponsablesService>(BpinResponsablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
