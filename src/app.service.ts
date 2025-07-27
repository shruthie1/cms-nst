import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as schedule from 'node-schedule-tz';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ClientService, BufferClientService, SetupClientQueryDto } from 'common-tg-service';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly clientService: ClientService,
    private readonly bufferClientService: BufferClientService,
  ) {
    this.logger.log('App Module Constructor initiated!!');
  }

  onModuleInit() {
    this.logger.log('App Module initiated!!');
    this.scheduleJobs();

    if (!process.env.LOCAL_SERVER) {
      // Schedule initial join after 60s only in production
      setTimeout(async () => {
        this.logger.log('Initial joinchannelForBufferClients triggered after 60s');
        await this.safeCall(() => this.bufferClientService.joinchannelForBufferClients());
      }, 60000);
    }
  }

  private scheduleJobs() {
    try {
      // 🔁 Every day at 2:25 AM IST
      schedule.scheduleJob('bufferCheck', '25 2 * * *', 'Asia/Kolkata', async () => {
        this.logger.log('Running scheduled job: bufferCheck');
        await this.safeCall(() => this.bufferClientService.checkBufferClients());
      });

      // 🔁 Every 3 hours
      schedule.scheduleJob('bufferJoin', '0 */3 * * *', 'Asia/Kolkata', async () => {
        this.logger.log('Running scheduled job: bufferJoin');
        await this.safeCall(() => this.bufferClientService.joinchannelForBufferClients());
      });
    } catch (error) {
      this.logger.error('Error scheduling jobs', error);
    }
  }

  private async safeCall<T>(task: () => Promise<T>, context = 'Scheduled Task'): Promise<T | undefined> {
    try {
      return await task();
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error during ${context}`, err.stack || err.message);
      return undefined;
    }
  }


  refreshmap() {
    this.logger.log('Refreshing client map');
    this.clientService.refreshMap();
  }

  async setupClient(clientId: string, setupClientQueryDto: SetupClientQueryDto) {
    this.logger.log(`Setting up client: ${clientId}`);
    return this.clientService.setupClient(clientId, setupClientQueryDto);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async forwardGetRequest(externalUrl: string, queryParams: any): Promise<any> {
    try {
      this.logger.log(`Forwarding GET request to ${externalUrl} with params ${JSON.stringify(queryParams)}`);
      const response: AxiosResponse = await axios.get(externalUrl, { params: queryParams });
      return response.data;
    } catch (error) {
      const axiosErr = error as AxiosError;
      this.logger.error(`Error forwarding GET request: ${axiosErr.message}`, axiosErr.stack);
      throw new Error(`Error forwarding GET request: ${axiosErr.message}`);
    }
  }
}
