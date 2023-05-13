import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response } from 'express';
import { User as UserDto } from 'src/_gen/prisma-class/user';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginUserLocalDto } from './dto/local.dto';
import { RegisterUserDto } from './dto/register.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ExtractedUAT } from 'src/common/interfaces/tokens.interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  @ApiOperation({ summary: 'Login a user' })
  @ApiOkResponse({
    description: 'User logged in. Sets the cookie and returns the user',
    type: UserDto,
  })
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() body: LoginUserLocalDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const { user, token } = await this.authService.loginForUser(body.email);

    response.cookie('auth', token, { httpOnly: true, maxAge: 86400 });

    this.logger.log(`User ${user.email} logged in`);

    return user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @Public()
  @ApiOkResponse({
    description: 'User registered. Sets the cookie and returns the user',
    type: UserDto,
  })
  register(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body);
  }

  @Put('logout')
  @ApiOperation({ summary: 'Logout a user' })
  @ApiOkResponse({
    description: 'User logged out. Clears the cookie',
  })
  logout(
    @CurrentUser() user: ExtractedUAT,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.logger.log(`User ${user.email} logged out`);

    response.clearCookie('auth');
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get the profile of a user' })
  @ApiOkResponse({
    description: 'Returns the profile of the user',
    type: UserDto,
  })
  profile(@CurrentUser() user: ExtractedUAT): Promise<User> {
    this.logger.log(
      `User ${user.email} ${user.userId} requested their profile`,
    );

    return this.authService.getProfile(user.userId);
  }
}
