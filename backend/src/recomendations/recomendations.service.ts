import { Injectable } from '@nestjs/common';
import { PineconeService } from 'src/pinecone/pinecone.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecomendationsService {
  constructor(
    private readonly pineconeClient: PineconeService,
    private readonly prisma: PrismaService,
  ) {}

  async getRecomendations(userId: string) {
    const likedBooks = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        likedBooks: true,
      },
    });

    const index = this.pineconeClient.pineconeClient.Index('knjige');
    const ids = likedBooks.likedBooks.map((book) => book.title);

    console.log(ids);

    if (ids.length === 0)
      return await this.prisma.book.findMany({
        take: 5,
      });

    const vectors = await index.fetch({ ids });
    let embedding = new Array(1536).fill(0);

    let amount = 0;
    for (const vector in vectors.vectors) {
      const values = vectors.vectors[vector].values;
      embedding = embedding.map((value, index) => value + values[index]);
      amount++;
    }

    console.log(amount);

    if (amount === 0)
      return await this.prisma.book.findMany({
        take: 5,
      });

    embedding = embedding.map((value) => value / amount);

    const queryRequest = {
      vector: embedding,
      topK: 10,
      includeValues: false,
      includeMetadata: true,
    };

    const books = await index.query({ queryRequest });

    return await this.prisma.book.findMany({
      where: {
        title: {
          in: books.matches.map((book) => book.id),
        },
      },
      include: {
        owner: true,
        borrower: true,
      },
    });
  }
}
