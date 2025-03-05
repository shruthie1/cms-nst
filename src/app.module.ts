import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer } from '@nestjs/common';
import {
  BufferClientModule, BuildModule,
  ChannelsModule, ClientModule,
  LoggerMiddleware
} from 'common-tg-service';

@Module({
  imports: [BuildModule, ClientModule, BufferClientModule, ChannelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
