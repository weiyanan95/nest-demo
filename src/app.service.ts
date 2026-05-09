import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getDw(): string {
    return '您好，大伟！！！！';
  }
}
