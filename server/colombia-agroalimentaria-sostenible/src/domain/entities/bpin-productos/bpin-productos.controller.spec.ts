import { Test, TestingModule } from '@nestjs/testing';
import { BpinProductosController } from './bpin-productos.controller';
import { BpinProductosService } from './bpin-productos.service';

describe('BpinProductosController', () => {
  let controller: BpinProductosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BpinProductosController],
      providers: [BpinProductosService],
    }).compile();

    controller = module.get<BpinProductosController>(BpinProductosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
