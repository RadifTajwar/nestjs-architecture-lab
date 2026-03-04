import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { EvService } from 'src/ev/ev.service';

@Controller('database')
export class DatabaseController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly evService: EvService,
  ) {}
  @Get()
  getStatus() {
    return {
      status: this.databaseService.getStatus(),
      DB_URL: this.evService.getDatabaseEnv(),
    };
  }
}
