import { Test, TestingModule } from '@nestjs/testing';
import { SistemaprodOrgService } from './sistemaprod-org.service';

describe('SistemaprodOrgService', () => {
  let service: SistemaprodOrgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SistemaprodOrgService],
    }).compile();

    service = module.get<SistemaprodOrgService>(SistemaprodOrgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
