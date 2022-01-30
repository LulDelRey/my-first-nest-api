import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getPing(): string {
    return 'Pong!';
  }
  getTest(): any {
    return { ok: true };
  }
}
