import { Controller, Get, Query, Redirect, Req } from '@nestjs/common';
import { Store } from 'src/store';

@Controller('signaling')
export class SignalingController {
  @Get('preconnect')
  preconnect() {
    return Store.masterClient ? Store.getUserInfo(Store.masterClient) : {};
  }
}
