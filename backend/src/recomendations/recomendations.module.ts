import { Module } from '@nestjs/common';
import { RecomendationsService } from './recomendations.service';
import { RecomendationsController } from './recomendations.controller';
import { PinconeModule } from 'src/pinecone/pinecone.module';

@Module({
  controllers: [RecomendationsController],
  providers: [RecomendationsService],
  imports: [PinconeModule],
})
export class RecomendationsModule {}
