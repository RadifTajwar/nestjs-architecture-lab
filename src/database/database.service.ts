import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private isConnected = false;
  onModuleInit() {
    this.isConnected = true;
    console.log('Database is connected successfully');
  }
  onApplicationShutdown(signal: string) {
    this.isConnected = false;
    console.log('Database is disconnected.The reason is signal ', signal);
  }
  getStatus() {
    return this.isConnected ? 'Connected' : 'Disconnected';
  }
}
