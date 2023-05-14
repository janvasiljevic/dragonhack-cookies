import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();

const log = (content: string) => {
  console.log('🌱 ' + content);
};

const deleteAll = async () => {
  await prisma.bookReservation.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.userReview.deleteMany({});
  await prisma.achievement.deleteMany({});

  log('Deleted everything');
};

const genereateUsers = async () => {
  const password = await hash('secret', 10);

  await prisma.user.createMany({
    data: [
      {
        firstName: 'Matej',
        lastName: 'Piskotek',
        id: 'matej',
        email: 'matej@piskotki.si',
        password,
      },
      {
        lastName: 'Piskotek',
        firstName: 'Anja',
        id: 'anja',
        email: 'anja@piskotki.si',
        password,
      },
      {
        firstName: 'Matjaz',
        lastName: 'Piskotek',
        id: 'matjaz',
        email: 'matjaz@piskotki.si',
        password,
      },
      {
        lastName: 'Piskotek',
        firstName: 'Eva',
        id: 'jan',
        email: 'jan@piskotki.si',
        password,
      },
    ],
  });

  log('Added users to database');
};

const generateBooks = async () => {
  const users = await prisma.user.findMany();

  const books = readFileSync('./prisma/book_list.json', 'utf8');
  let userIndex = 0;

  await Promise.all(
    books
      .trim()
      .split('\n')
      .map(async (element) => {
        const book = JSON.parse(element.trim());
        const user = users[userIndex++ % users.length];

        const inf = book.volumeInfo;
        if (
          !(
            inf.title &&
            inf.authors &&
            inf.description &&
            inf.imageLinks &&
            inf.industryIdentifiers
          )
        )
          return;

        return await prisma.book.create({
          data: {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors.join(', '),
            description: book.volumeInfo.description,
            coverUrl: book.volumeInfo.imageLinks.thumbnail,
            isbn: book.volumeInfo.industryIdentifiers[0].identifier,
            ownerId: user.id,
          },
        });
      }),
  );

  log('Added books to database');
};

async function createReservation(bookId: string, userId: string) {
  await prisma.bookReservation.create({
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

async function createLikedBook(bookId: string, userId: string) {
  await prisma.user.update({
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
}

async function generateBookReservationsAndLikes() {
  const books = await prisma.book.findMany();
  const users = await prisma.user.findMany();

  await Promise.all(
    books.map(async (book) => {
      const otherUsers = users.filter((user) => user.id !== book.ownerId);

      return otherUsers.map(async (user) => {
        if (Math.random() < 0.01) return await createLikedBook(book.id, user.id);
        if (Math.random() < 0.1) return await createReservation(book.id, user.id);
      });
    }),
  );

  log('Added book reservations to database');
}

async function main() {
  await deleteAll();
  await genereateUsers();
  await generateBooks();
  await generateBookReservationsAndLikes();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
