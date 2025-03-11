import { Test, TestingModule } from '@nestjs/testing';
import { BpinSubActividadesController } from './bpin-sub-actividades.controller';
import { BpinSubActividadesService } from './bpin-sub-actividades.service';

describe('BpinSubActividadesController', () => {
  let controller: BpinSubActividadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BpinSubActividadesController],
      providers: [BpinSubActividadesService],
    }).compile();

    controller = module.get<BpinSubActividadesController>(BpinSubActividadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
