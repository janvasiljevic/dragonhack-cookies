import { Injectable, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FriendsService.name);

  async create(userId: string, friendId: string) {
    this.logger.log(`Creating friendship between ${userId} and ${friendId}`);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friendsTo: {
          connect: {
            id: friendId,
          },
        },
      },
    });
  }

  async delete(userId: string, friendId: string) {
    this.logger.log(`Deleting friendship between ${userId} and ${friendId}`);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friendsTo: {
          disconnect: {
            id: friendId,
          },
        },
      },
    });
  }

  async search(search: string, userId: string) {
    this.logger.log(`Searching for ${search} for user ${userId}`);

    const users = await this.prisma.user.findMany({
      where: {
        AND: {
          friendsTo: {
            none: {
              id: userId,
            },
          },
          NOT: {
            id: userId,
          },
          OR: [
            {
              firstName: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
      },
    });

    return users;
  }
}
