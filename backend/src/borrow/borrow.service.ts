import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
      include: {
        book: true,
        user: true,
      },
    });
  }

  async getOwnerReservations(id: string) {
    return await this.prisma.bookReservation.findMany({
      where: {
        book: {
          ownerId: id,
        },
      },
      include: {
        book: true,
        user: true,
      },
    });
  }

  async getUserReservations(id: string) {
    return await this.prisma.bookReservation.findMany({
      where: {
        userId: id,
      },
      include: {
        book: true,
        user: true,
      },
    });
  }

  async acceptReservation(userId: string, id: string) {
    const reservation = await this.prisma.bookReservation.findUnique({
      where: {
        id,
      },
      include: {
        book: true,
      },
    });

    if (!reservation) throw new NotFoundException('Rezervacija ne obstaja');
    if (reservation.book.status !== 'AVAILABLE')
      throw new BadRequestException('Knjiga je že izposojena');

    if (reservation.book.ownerId !== userId)
      throw new UnauthorizedException('Nimate pravic za potrditev rezervacije');

    await this.prisma.book.update({
      where: {
        id: reservation.bookId,
      },
      data: {
        status: 'BORROWED',
        borrower: {
          connect: {
            id: reservation.userId,
          },
        },
        borrowDate: new Date(),
        returnDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      },
    });

    await this.prisma.user.update({
      where: {
        id: reservation.userId,
      },
      data: {
        borrowedBooks: {
          connect: {
            id: reservation.bookId,
          },
        },
      },
    });

    return await this.prisma.bookReservation.delete({
      where: {
        id,
      },
    });
  }

  async returnBook(userId: string, bookId: string, liked: boolean) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) throw new NotFoundException('Knjiga ne obstaja');
    if (book.status !== 'BORROWED')
      throw new BadRequestException('Knjiga ni izposojena');

    if (book.ownerId !== userId)
      throw new UnauthorizedException('Nimate pravic za vrnitev knjige');

    await this.prisma.user.update({
      where: {
        id: book.borrowerId,
      },
      data: {
        numberOfBooksRead: {
          increment: 1,
        },
        borrowedBooks: {
          disconnect: {
            id: bookId,
          },
        },
      },
    });

    if (liked) {
      await this.prisma.user.update({
        where: {
          id: book.borrowerId,
        },
        data: {
          likedBooks: {
            connect: {
              id: bookId,
            },
          },
        },
      });
    }

    return await this.prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        status: 'AVAILABLE',
        borrower: {
          disconnect: true,
        },
        borrowDate: null,
        returnDate: null,
      },
    });
  }

  async cancelReservation(userId: string, id: string) {
    const reservation = await this.prisma.bookReservation.findUnique({
      where: {
        id,
      },
      include: {
        book: {
          select: {
            ownerId: true,
          },
        },
      },
    });

    if (!reservation) throw new NotFoundException('Rezervacija ne obstaja');

    if (reservation.book.ownerId !== userId && reservation.userId !== userId)
      throw new UnauthorizedException('Nimate pravic za preklic rezervacije');

    return await this.prisma.bookReservation.delete({
      where: {
        id,
      },
    });
  }
}
