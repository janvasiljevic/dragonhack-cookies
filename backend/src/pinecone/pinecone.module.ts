import { Global, Module } from '@nestjs/common';
import { PineconeService } from './pinecone.service';

@Global()
@Module({ providers: [PineconeService], exports: [PineconeService] })
export class PinconeModule {}
