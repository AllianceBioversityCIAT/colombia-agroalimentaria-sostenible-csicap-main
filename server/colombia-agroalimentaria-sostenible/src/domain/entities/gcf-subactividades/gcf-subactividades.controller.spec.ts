import { Test, TestingModule } from '@nestjs/testing';
import { GcfSubactividadesController } from './gcf-subactividades.controller';
import { GcfSubactividadesService } from './gcf-subactividades.service';

describe('GcfSubactividadesController', () => {
  let controller: GcfSubactividadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GcfSubactividadesController],
      providers: [GcfSubactividadesService],
    }).compile();

    controller = module.get<GcfSubactividadesController>(GcfSubactividadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
