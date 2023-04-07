import { Controller, Get, Query, Redirect, Req } from '@nestjs/common';

@Controller('signaling')
export class SignalingController {
  @Get('check-health')
  checkHealth(@Query('uid') uid: string, @Query('version') version: string) {
    return uid + version;
  }

  @Get('check-version')
  @Redirect('https://docs.nestjs.com', 302)
  versionCheck(@Query('version') version: string) {
    if (version && version === '5') {
      return {
        url: 'https://jimu.corp.kuaishou.com/',
        statusCode: 302,
      };
    }
  }
}
