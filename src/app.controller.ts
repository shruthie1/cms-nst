import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  Query
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  SetupClientQueryDto
} from 'common-tg-service';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery
} from '@nestjs/swagger';

@Controller()
export class AppController {
  protected readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {
    this.logger.log('App Controller Constructor initiated!!');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('setupClient/:clientId')
  @ApiOperation({ summary: 'Set up a Telegram client with query parameters' })
  @ApiResponse({ status: 200, description: 'Client setup initiated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid setup parameters.' })
  async setupClient(
    @Param('clientId') clientId: string,
    @Query() setupClientQueryDto: SetupClientQueryDto
  ) {
    this.appService.setupClient(clientId, setupClientQueryDto);
    return `Started Client Setup for ${clientId}`;
  }

  @Get('exit')
  @ApiOperation({ summary: 'Exit the running process (for dev/debug only)' })
  @ApiResponse({ status: 200, description: 'Process will exit after 2 seconds.' })
  exit(): string {
    this.logger.warn('Exit API called — shutting down in 2 seconds...');

    setTimeout(() => {
      this.logger.warn('Exiting the application now...');
      process.exit(1);
    }, 2000);

    return 'Exiting in 2 seconds';
  }

  @Get('refreshmap')
  @ApiOperation({ summary: 'Refresh internal client service map' })
  @ApiResponse({ status: 200, description: 'Client map refreshed successfully.' })
  async refreshmap(): Promise<void> {
    return this.appService.refreshmap();
  }

  @Get('forward')
  @ApiOperation({ summary: 'Forward a GET request to an external URL with query parameters' })
  @ApiQuery({ name: 'url', required: true, description: 'The full external URL to forward to' })
  @ApiResponse({ status: 200, description: 'Response from the forwarded request.' })
  @ApiResponse({ status: 400, description: 'Missing or invalid "url" query parameter.' })
  async forward(@Query() query: any): Promise<any> {
    const { url, ...params } = query;

    if (!url || typeof url !== 'string') {
      throw new BadRequestException('The "url" query parameter is required and must be a valid string.');
    }

    // Optional: validate URL structure
    try {
      new URL(url);
    } catch {
      throw new BadRequestException('The provided "url" is not a valid URL.');
    }

    this.logger.log(`Forwarding GET request to ${url} with params: ${JSON.stringify(params)}`);
    return await this.appService.forwardGetRequest(url, params);
  }
}
