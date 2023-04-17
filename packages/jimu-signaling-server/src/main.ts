import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { PeerServer } from 'peer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  const httpServer = createServer(app.getHttpServer());
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  app.useWebSocketAdapter(new IoAdapter(io));
  await app.listen(3000);
}
bootstrap();

// 启用Peer信令服务器
PeerServer({ port: 9000, path: '/peer' });
