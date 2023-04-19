import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignalingModule } from './signaling/signaling.module';
import { EventsModule } from './events/events.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [SignalingModule, EventsModule, PageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
