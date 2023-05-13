import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginUserLocalDto } from './dto/local.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserController } from 'src/user/user.controller';
import { User } from 'src/_gen/prisma-class/user';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  @ApiOperation({ summary: 'Login a user' })
  @ApiOkResponse({
    description: 'User logged in. Sets the cookie and returns the user',
    type: User,
  })
  @UseGuards(LocalAuthGuard)
  login(@Body() body: LoginUserLocalDto): Promise<User> {
    return this.authService.getProfile('test');
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @Public()
  register(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body);
  }

  @Put('logout')
  @ApiOperation({ summary: 'Logout a user' })
  logout() {
    return 'logout';
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get the profile of a user' })
  profile(): Promise<User> {
    return this.authService.getProfile('test');
  }
}
