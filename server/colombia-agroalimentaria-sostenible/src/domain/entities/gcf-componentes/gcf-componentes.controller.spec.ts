import { Test, TestingModule } from '@nestjs/testing';
import { GcfComponentesController } from './gcf-componentes.controller';
import { GcfComponentesService } from './gcf-componentes.service';

describe('GcfComponentesController', () => {
  let controller: GcfComponentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GcfComponentesController],
      providers: [GcfComponentesService],
    }).compile();

    controller = module.get<GcfComponentesController>(GcfComponentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
