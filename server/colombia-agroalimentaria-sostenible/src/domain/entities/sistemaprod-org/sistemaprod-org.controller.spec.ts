import { Test, TestingModule } from '@nestjs/testing';
import { SistemaprodOrgController } from './sistemaprod-org.controller';
import { SistemaprodOrgService } from './sistemaprod-org.service';

describe('SistemaprodOrgController', () => {
  let controller: SistemaprodOrgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SistemaprodOrgController],
      providers: [SistemaprodOrgService],
    }).compile();

    controller = module.get<SistemaprodOrgController>(SistemaprodOrgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
