import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { generate } from 'rxjs';

const prisma = new PrismaClient();

const log = (content: string) => {
  console.log('🌱 ' + content);
};

const deleteAll = async () => {
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
      { email: 'matej@piskotki.si', password },
      { email: 'anja@piskotki.si', password },
      { email: 'matjaz@piskotki.si', password },
      { email: 'jan@piskotki.si', password },
    ],
  });

  log('Added users to database');
};

const generateBooks = async () => {
  const users = await prisma.user.findMany();

  users.forEach(async (user) => {
    await prisma.book.createMany({
      data: [
        {
          title: 'Harry Potter',
          author: 'J. K. Rowling',
          ownerId: user.id,
          description: 'To je Harry Potter',
          isbn: 'garbage',
          coverUrl: 'https://m.media-amazon.com/images/I/71-++hbbERL.jpg',
        },
        {
          title: 'Witcher',
          author: 'Andrzej Sapkowski',
          ownerId: user.id,
          description: 'To ni Harry Potter, je Witcher',
          isbn: 'garbage',
          coverUrl:
            'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg',
        },
        {
          title: '1984',
          author: 'George Orwell',
          ownerId: user.id,
          description: 'Literally 1984',
          isbn: 'garbage',
          coverUrl:
            'https://kbimages1-a.akamaihd.net/c9472126-7f96-402d-ba57-5ba4c0f4b238/1200/1200/False/nineteen-eighty-four-1984-george.jpg',
        },
      ],
    });
  });

  log('Added books to database');
};

async function main() {
  await deleteAll();
  await genereateUsers();
  await generateBooks();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
