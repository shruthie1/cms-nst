import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer } from '@nestjs/common';
import {
  BufferClientModule, BuildModule,
  ChannelsModule, ClientModule,
  LoggerMiddleware,
  UpiIdModule,
  UsersModule,
  UserDataModule,
  PromoteClientModule,
  TelegramModule,
  NpointModule,
  PromoteMsgModule,
  TransactionModule,
  ArchivedClientModule,
  TimestampModule,
  TgSignupModule,
  ActiveChannelsModule,
  Stat1Module,
  Stat2Module,
  PromoteStatModule
} from 'common-tg-service';

@Module({
  imports: [
    BuildModule,
    ClientModule,
    BufferClientModule,
    ChannelsModule,
    UsersModule,
    UserDataModule,
    PromoteClientModule,
    TelegramModule,
    UpiIdModule,
    NpointModule,
    PromoteMsgModule,
    TransactionModule,
    ArchivedClientModule,
    TimestampModule,
    TgSignupModule,
    ActiveChannelsModule,
    Stat1Module,
    Stat2Module,
    PromoteStatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
