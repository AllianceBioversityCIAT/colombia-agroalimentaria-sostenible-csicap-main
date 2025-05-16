import { Test, TestingModule } from '@nestjs/testing';
import { SistemasProductivosController } from './sistemas-productivos.controller';
import { SistemasProductivosService } from './sistemas-productivos.service';

describe('SistemasProductivosController', () => {
  let controller: SistemasProductivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SistemasProductivosController],
      providers: [SistemasProductivosService],
    }).compile();

    controller = module.get<SistemasProductivosController>(SistemasProductivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
