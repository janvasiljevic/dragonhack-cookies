import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BorrowService {
  constructor(private readonly prisma: PrismaService) {}

  async reserve(userId: string, bookId: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) throw new NotFoundException('Knjiga ne obstaja');

    if (book.status !== 'AVAILABLE')
      throw new NotFoundException('Knjiga je že izposojena');

    return await this.prisma.bookReservation.create({
      data: {
        book: {
          connect: {
            id: bookId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getBookReservations(id: string) {
    return await this.prisma.bookReservation.findMany({
      where: {
        bookId: id,
      },
    });
  }

  async getUserReservations(id: string) {
    return await this.prisma.bookReservation.findMany({
      where: {
        book: {
          ownerId: id,
        },
      },
    });
  }
}
