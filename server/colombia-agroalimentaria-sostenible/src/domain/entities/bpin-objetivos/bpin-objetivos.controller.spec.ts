import { Test, TestingModule } from '@nestjs/testing';
import { BpinObjetivosController } from './bpin-objetivos.controller';
import { BpinObjetivosService } from './bpin-objetivos.service';

describe('BpinObjetivosController', () => {
  let controller: BpinObjetivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BpinObjetivosController],
      providers: [BpinObjetivosService],
    }).compile();

    controller = module.get<BpinObjetivosController>(BpinObjetivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
