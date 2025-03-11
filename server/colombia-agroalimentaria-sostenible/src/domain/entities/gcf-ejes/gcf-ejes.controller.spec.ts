import { Test, TestingModule } from '@nestjs/testing';
import { GcfEjesController } from './gcf-ejes.controller';
import { GcfEjesService } from './gcf-ejes.service';

describe('GcfEjesController', () => {
  let controller: GcfEjesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GcfEjesController],
      providers: [GcfEjesService],
    }).compile();

    controller = module.get<GcfEjesController>(GcfEjesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
