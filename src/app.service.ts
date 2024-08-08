import { Injectable, OnModuleInit } from '@nestjs/common';
import * as schedule from 'node-schedule-tz';
import { BufferClientService, ClientService, fetchWithTimeout } from 'commonService';
import { SetupClientQueryDto } from 'commonService/dist/components/clients/dto/setup-client.dto';

@Injectable()
export class AppService implements OnModuleInit {
  private timeoutId: NodeJS.Timeout;
  constructor(
    private clientService: ClientService,
    private bufferClientService: BufferClientService,
  ) {
    console.log("App Module Constructor initiated !!");
  }

  onModuleInit() {
    console.log("App Module initiated !!");
    try {
      schedule.scheduleJob('test3', ' 25 2 * * * ', 'Asia/Kolkata', async () => {
        // checkBufferClients()
        await this.bufferClientService.checkBufferClients();
        // Do it in UptimeChecker Service
        // for (const value of userMap.values()) {
        //   try {
        //     const now = new Date();
        //     if (now.getUTCDate() % 3 === 1) {
        //       await fetchWithTimeout(`${value.url}leavechannels`);
        //     }
        //   } catch (error) {
        //     console.log("Some Error: ", error.code);
        //   }
        //   await sleep(3000)
        // }
        // await fetchWithTimeout(`${process.env.uptimeChecker}/joinchannel`)
        // await fetchWithTimeout(`https://mychatgpt-pg6w.onrender.com/deletefiles`);
      })

      schedule.scheduleJob('test4', '0 */4 * * *', 'Asia/Kolkata', async () => {
        // fetchWithTimeout(`${process.env.uptimeChecker}/joinchannel`)
        this.bufferClientService.joinchannelForBufferClients();
      })
    } catch (error) {
      console.log("Some Error: ", error);
    }
    if (!process.env.LOCAL_SERVER) {
      setTimeout(() => {
        this.bufferClientService.joinchannelForBufferClients();
      }, 60000);
    }
  }

  async setupClient(clientId: string, setupClientQueryDto: SetupClientQueryDto) {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.bufferClientService.joinchannelForBufferClients();
      this.timeoutId = undefined;
    }, 120000)
    return await this.clientService.setupClient(clientId, setupClientQueryDto);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
