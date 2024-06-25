import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BufferClientModule, ChannelsModule, ClientModule } from 'commonService';

@Module({
  imports: [ClientModule, BufferClientModule, ChannelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
