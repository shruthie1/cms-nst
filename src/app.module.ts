import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BufferClientModule, ClientModule } from 'commonService';

@Module({
  imports: [ClientModule, BufferClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
