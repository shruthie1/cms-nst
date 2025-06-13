import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer } from '@nestjs/common';
import * as cts from 'common-tg-service';
import * as AMS from 'ams-ssk';
@Module({
  imports: [
    forwardRef(() => cts.InitModule),
    AMS.FileModule.forRoot(),
    forwardRef(() => cts.BuildModule),
    forwardRef(() => cts.ClientModule),
    forwardRef(() => cts.BufferClientModule),
    forwardRef(() => cts.ChannelsModule),
    forwardRef(() => cts.UsersModule),
    forwardRef(() => cts.UserDataModule),
    forwardRef(() => cts.PromoteClientModule),
    forwardRef(() => cts.TelegramModule),
    forwardRef(() => cts.UpiIdModule),
    forwardRef(() => cts.NpointModule),
    forwardRef(() => cts.PromoteMsgModule),
    forwardRef(() => cts.TransactionModule),
    forwardRef(() => cts.ArchivedClientModule),
    forwardRef(() => cts.TimestampModule),
    forwardRef(() => cts.TgSignupModule),
    forwardRef(() => cts.ActiveChannelsModule),
    forwardRef(() => cts.Stat1Module),
    forwardRef(() => cts.Stat2Module),
    forwardRef(() => cts.PromoteStatModule),
  ],
  controllers: [AppController],
  providers: [AppService, cts.MemoryCleanerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cts.LoggerMiddleware).forRoutes('*');
  }
}
