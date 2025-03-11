import { Test, TestingModule } from '@nestjs/testing';
import { BpinResponsablesController } from './bpin-responsables.controller';
import { BpinResponsablesService } from './bpin-responsables.service';

describe('BpinResponsablesController', () => {
  let controller: BpinResponsablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BpinResponsablesController],
      providers: [BpinResponsablesService],
    }).compile();

    controller = module.get<BpinResponsablesController>(BpinResponsablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
