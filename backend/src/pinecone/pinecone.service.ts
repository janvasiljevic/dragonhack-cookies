import {
  INestApplication,
  Injectable,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PineconeClient } from '@pinecone-database/pinecone';

@Injectable()
export class PineconeService {
  private readonly logger = new Logger(PineconeClient.name);

  readonly pineconeClient;

  constructor() {
    this.pineconeClient = new PineconeClient();

    (async () => {
      await this.pineconeClient.init({
        environment: 'asia-southeast1-gcp-free',
        apiKey: '14414257-022f-4acd-8273-3725cb2fb8d9', // KIDS, DON'T TRY THIS AT HOME
      });
    })();
  }
}
