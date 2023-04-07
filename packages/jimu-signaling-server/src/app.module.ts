import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignalingController } from './signaling/signaling.controller';

@Module({
  imports: [],
  controllers: [AppController, SignalingController],
  providers: [AppService],
})
export class AppModule {}
