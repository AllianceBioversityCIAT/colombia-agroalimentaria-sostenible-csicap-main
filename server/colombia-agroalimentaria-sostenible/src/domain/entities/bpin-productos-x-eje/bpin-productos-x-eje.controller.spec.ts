import { Test, TestingModule } from '@nestjs/testing';
import { BpinProductosXEjeController } from './bpin-productos-x-eje.controller';
import { BpinProductosXEjeService } from './bpin-productos-x-eje.service';

describe('BpinProductosXEjeController', () => {
  let controller: BpinProductosXEjeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BpinProductosXEjeController],
      providers: [BpinProductosXEjeService],
    }).compile();

    controller = module.get<BpinProductosXEjeController>(BpinProductosXEjeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
