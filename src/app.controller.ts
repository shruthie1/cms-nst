import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { SetupClientQueryDto } from 'commonService/dist/components/clients/dto/setup-client.dto';

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
}
