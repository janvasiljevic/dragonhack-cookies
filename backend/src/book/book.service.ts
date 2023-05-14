import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBookISBNDto } from './dto/create-book-isbn.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { GoogleAPIBook } from './interfaces/google-api-book';
import { AxiosError } from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book, Prisma } from '@prisma/client';
import { PineconeService } from 'src/pinecone/pinecone.service';

@Injectable()
export class BookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly pinecone: PineconeService,
  ) {}

  private async queryGoogleBookAPI(query: string): Promise<GoogleAPIBook> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<GoogleAPIBook>(
          `https://www.googleapis.com/books/v1/volumes?q=${query}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw new NotFoundException('Knjiga s tem ISBN ne obstaja');
          }),
        ),
    );

    if (data.totalItems === 0)
      throw new NotFoundException('Knjiga s tem ISBN ne obstaja');

    return data;
  }

  private async getEmbedding(description: string): Promise<any> {
    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer Ak0iZQvsaWkvwxV215C4KqYGUCNc1n', // KIDS, DON'T DO THIS AT HOME
    };
    const { data } = await firstValueFrom(
      this.httpService
        .post<any>(
          'https://openai-api.meetings.bio/api/openai/embeddings',
          {
            model: 'text-embedding-ada-002',
            input: description,
          },
          {
            headers: headersRequest,
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw new NotFoundException('Error');
          }),
        ),
    );

    return data;
  }

  async createFromISBN(userID: string, createFromISBN: CreateBookISBNDto) {
    const book = await this.queryGoogleBookAPI(`isbn:${createFromISBN.isbn}`);

    let embedding = await this.getEmbedding(
      book.items[0].volumeInfo.description,
    );
    embedding = embedding.data[0].embedding;
    const index = this.pinecone.pineconeClient.Index('knjige');

    await index.delete1({
      ids: [book.items[0].volumeInfo.title],
    });

    const upsertRequest = {
      vectors: [
        {
          id: book.items[0].volumeInfo.title,
          values: embedding,
        },
      ],
    };
    await index.upsert({
      upsertRequest,
    });

    return await this.prisma.book.create({
      data: {
        title: book.items[0].volumeInfo.title,
        author: book.items[0].volumeInfo.authors.join(', '),
        description: book.items[0].volumeInfo.description,
        coverUrl: book.items[0].volumeInfo.imageLinks.thumbnail,
        isbn: book.items[0].volumeInfo.industryIdentifiers[0].identifier,
        ownerId: userID,
      },
    });
  }

  async findAll() {
    return await this.prisma.book.findMany();
  }

  async search(query: string) {
    // Search the books using raw SQL and postgresql trigram similarity
    const result = await this.prisma.$queryRaw<Book[]>(
      Prisma.sql`SELECT * FROM public."Book" WHERE SIMILARITY(title, ${query}) > 0.2 OR SIMILARITY(author, ${query}) > 0.2 ORDER BY SIMILARITY(title, ${query}) DESC;`,
    );

    return result;
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
        borrower: true,
        likedBy: true,
      },
    });

    if (!book) throw new NotFoundException('Knjiga ne obstaja');

    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async remove(ownerId: string, id: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) throw new NotFoundException('Knjiga ne obstaja');
    if (book.ownerId !== ownerId)
      throw new UnauthorizedException('Nisi lastnik knjige');

    return await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }

  async like(userId: string, bookId: string, liked: boolean) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) throw new NotFoundException('Knjiga ne obstaja');

    if (liked) {
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          likedBooks: {
            connect: {
              id: bookId,
            },
          },
        },
      });
    } else {
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          likedBooks: {
            disconnect: {
              id: bookId,
            },
          },
        },
      });
    }
  }
}
