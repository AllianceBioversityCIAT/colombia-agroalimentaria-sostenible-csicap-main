import { Test, TestingModule } from '@nestjs/testing';
import { SubprodXOrgXSistoperativoService } from './subprod-x-org-x-sistoperativo.service';

describe('SubprodXOrgXSistoperativoService', () => {
  let service: SubprodXOrgXSistoperativoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubprodXOrgXSistoperativoService],
    }).compile();

    service = module.get<SubprodXOrgXSistoperativoService>(SubprodXOrgXSistoperativoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
