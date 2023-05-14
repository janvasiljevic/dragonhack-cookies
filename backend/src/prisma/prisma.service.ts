import {
  INestApplication,
  Injectable,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ['query'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
    // enable trigrams on postgresql
    await this.$queryRaw(Prisma.sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
    this.logger.verbose('Connected to PostgresSQL');
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
