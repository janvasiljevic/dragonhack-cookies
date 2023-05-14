import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { FriendsModule } from './friends/friends.module';
import { RecomendationsModule } from './recomendations/recomendations.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, BookModule, BorrowModule, FriendsModule, RecomendationsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
