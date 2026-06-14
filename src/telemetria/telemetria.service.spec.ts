import { Test, TestingModule } from '@nestjs/testing';
import { TelemetriaService } from './telemetria.service';

describe('TelemetriaService', () => {
  let service: TelemetriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelemetriaService],
    }).compile();

    service = module.get<TelemetriaService>(TelemetriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
