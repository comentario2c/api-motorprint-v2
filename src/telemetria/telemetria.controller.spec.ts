import { Test, TestingModule } from '@nestjs/testing';
import { TelemetriaController } from './telemetria.controller';

describe('TelemetriaController', () => {
  let controller: TelemetriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelemetriaController],
    }).compile();

    controller = module.get<TelemetriaController>(TelemetriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
