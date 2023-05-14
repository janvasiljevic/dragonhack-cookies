import { Controller, Get } from '@nestjs/common';
import { RecomendationsService } from './recomendations.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Book } from 'src/_gen/prisma-class/book';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ExtractedUAT } from 'src/common/interfaces/tokens.interface';

@Controller('recomendations')
@ApiTags('recomendations')
export class RecomendationsController {
  constructor(private readonly recomendationsService: RecomendationsService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns all recomendations for the user based on his liked books',
  })
  @ApiOkResponse({
    description: 'All recomendations',
    type: [Book],
  })
  getRecomendations(@CurrentUser() { userId }: ExtractedUAT) {
    return this.recomendationsService.getRecomendations(userId);
  }
}
