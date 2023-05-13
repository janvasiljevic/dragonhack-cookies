import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/_gen/prisma-class/user';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Returns all users in the DB',
  })
  @ApiOkResponse({
    description: 'All users',
    type: [User],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiParam({
    name: 'id',
    type: String,
    description: 'id of the user',
    required: true,
  })
  @ApiOperation({
    summary: 'Returns the user with ID',
  })
  @ApiOkResponse({
    description: 'The user',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Not implemented',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Not implemented',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
