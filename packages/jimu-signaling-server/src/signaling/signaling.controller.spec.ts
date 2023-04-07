import { Test, TestingModule } from '@nestjs/testing';
import { SignalingController } from './signaling.controller';

describe('SignalingController', () => {
  let controller: SignalingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignalingController],
    }).compile();

    controller = module.get<SignalingController>(SignalingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
