import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer } from '@nestjs/common';
import {
  InitModule,
  BufferClientModule,
  BuildModule,
  ChannelsModule,
  ClientModule,
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
  PromoteStatModule,
} from 'common-tg-service';

@Module({
  imports: [
    forwardRef(() => InitModule),
    forwardRef(() => BuildModule),
    forwardRef(() => ClientModule),
    forwardRef(() => BufferClientModule),
    forwardRef(() => ChannelsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => UserDataModule),
    forwardRef(() => PromoteClientModule),
    forwardRef(() => TelegramModule),
    forwardRef(() => UpiIdModule),
    forwardRef(() => NpointModule),
    forwardRef(() => PromoteMsgModule),
    forwardRef(() => TransactionModule),
    forwardRef(() => ArchivedClientModule),
    forwardRef(() => TimestampModule),
    forwardRef(() => TgSignupModule),
    forwardRef(() => ActiveChannelsModule),
    forwardRef(() => Stat1Module),
    forwardRef(() => Stat2Module),
    forwardRef(() => PromoteStatModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
