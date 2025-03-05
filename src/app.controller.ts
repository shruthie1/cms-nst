import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { SetupClientQueryDto } from 'common-tg-service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('setupClient/:clientId')
  @ApiOperation({ summary: 'SetUp Client data' })
  //@apiresponse({ status: 200, description: 'Return the user data.' })
  //@apiresponse({ status: 404, description: 'User data not found.' })
  async setupClient(@Param('clientId') clientId: string, @Query() setupClientQueryDto: SetupClientQueryDto) {
    this.appService.setupClient(clientId, setupClientQueryDto);
    return `Started Client Seup for ${clientId}`
  }

  @Get("exit")
  exit(): string {
    process.exit(1)
  }

  @Get('refreshmap')
  @ApiOperation({ summary: 'refreshmap for Clients' })
  async refreshmap(): Promise<void> {
    return this.appService.refreshmap();
  }

  @Get('forward')
  async forward(@Query('url') url: string, @Query() query: any): Promise<any> {
    // Remove 'url' from the query object as it's used separately
    delete query.url;

    // Validate that the 'url' query parameter is provided
    if (!url) {
      throw new BadRequestException('The "url" query parameter is required.');
    }

    // Forward the request to the user-provided external URL with query parameters and return the response
    return await this.appService.forwardGetRequest(url, query);
  }
}
