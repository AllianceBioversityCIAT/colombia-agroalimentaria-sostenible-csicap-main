import { Test, TestingModule } from '@nestjs/testing';
import { SubprodXOrgXSistoperativoController } from './subprod-x-org-x-sistoperativo.controller';
import { SubprodXOrgXSistoperativoService } from './subprod-x-org-x-sistoperativo.service';

describe('SubprodXOrgXSistoperativoController', () => {
  let controller: SubprodXOrgXSistoperativoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubprodXOrgXSistoperativoController],
      providers: [SubprodXOrgXSistoperativoService],
    }).compile();

    controller = module.get<SubprodXOrgXSistoperativoController>(SubprodXOrgXSistoperativoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
