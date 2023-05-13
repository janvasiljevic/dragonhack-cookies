import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/_gen/prisma-class/user';
import { FriendsService } from './friends.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ExtractedUAT } from 'src/common/interfaces/tokens.interface';

@Controller('friends')
@ApiTags('Friends (oz. v ednini zame :( )')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post(':id')
  @ApiOperation({ summary: 'Create a new friendship' })
  create(
    @CurrentUser() { userId }: ExtractedUAT,
    @Param('id') friendId: string,
  ) {
    return this.friendsService.create(userId, friendId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a friendship' })
  delete(
    @CurrentUser() { userId }: ExtractedUAT,
    @Param('id') friendId: string,
  ) {
    return this.friendsService.delete(userId, friendId);
  }

  @Get()
  @ApiOperation({
    summary: 'Search for new friends',
    description: 'Search for new friends. Excludes already made friends',
  })
  @ApiOkResponse({ description: 'Search results', type: [User] })
  search(@Query('search') search: string, @CurrentUser() user: ExtractedUAT) {
    return this.friendsService.search(search, user.userId);
  }
}
