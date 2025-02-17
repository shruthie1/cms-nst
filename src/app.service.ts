import { Injectable, OnModuleInit } from '@nestjs/common';
import * as schedule from 'node-schedule-tz';
import { BufferClientService, ClientService } from 'commonService';
import { SetupClientQueryDto } from 'commonService/dist/components/clients/dto/setup-client.dto';
import axios, { AxiosResponse } from 'axios';

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

      schedule.scheduleJob('test4', '0 */3 * * *', 'Asia/Kolkata', async () => {
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

  refreshmap() {
    this.clientService.refreshMap()
  }

  async setupClient(clientId: string, setupClientQueryDto: SetupClientQueryDto) {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.bufferClientService.joinchannelForBufferClients();
      this.timeoutId = undefined;
    }, 120000)
    return this.clientService.setupClient(clientId, setupClientQueryDto);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async forwardGetRequest(externalUrl: string, queryParams: any): Promise<AxiosResponse<any>> {
    try {
      // Forward the request using GET method with query parameters
      const response = await axios.get(externalUrl, { params: queryParams });
      
      // Return the response from the external API
      return response.data;
    } catch (error) {
      // Handle the error
      throw new Error(`Error forwarding GET request: ${error.message}`);
    }
  }
}
