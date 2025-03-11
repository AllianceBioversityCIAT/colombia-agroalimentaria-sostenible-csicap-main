import { Test, TestingModule } from '@nestjs/testing';
import { GcfActividadesController } from './gcf-actividades.controller';
import { GcfActividadesService } from './gcf-actividades.service';

describe('GcfActividadesController', () => {
  let controller: GcfActividadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GcfActividadesController],
      providers: [GcfActividadesService],
    }).compile();

    controller = module.get<GcfActividadesController>(GcfActividadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
