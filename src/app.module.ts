import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BufferClientModule, ChannelsModule, ClientModule, BuildModule, LoggerMiddleware } from 'commonService';
import { MiddlewareConsumer } from '@nestjs/common';

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
