import { Test, TestingModule } from '@nestjs/testing';
import { BpinActividadesController } from './bpin-actividades.controller';
import { BpinActividadesService } from './bpin-actividades.service';

describe('BpinActividadesController', () => {
  let controller: BpinActividadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BpinActividadesController],
      providers: [BpinActividadesService],
    }).compile();

    controller = module.get<BpinActividadesController>(
      BpinActividadesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
