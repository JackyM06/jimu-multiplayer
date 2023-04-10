import { Module } from '@nestjs/common';
import { SignalingService } from './signaling.service';
import { SignalingController } from './signaling.controller';

@Module({
  controllers: [SignalingController],
  providers: [SignalingService],
  exports: [SignalingService],
})
export class SignalingModule {}
