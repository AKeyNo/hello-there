import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import sha256 from 'crypto-js/sha256';

async function main() {
  // create a test user that anyone can use to login
  await prisma.user.upsert({
    where: { username: 'username' },
    update: {},
    create: {
      email: 'example@gmail.com',
      username: 'realCaesarAugustus',
      hashedPassword: sha256('!eg_g-tof-u_fis3h').toString(),
      firstName: 'Caesar',
      lastName: 'Augustus',
      aboutMe: 'I was the first Roman emperor. You might have heard about me.',
      location: 'Rome',
      joinDate: new Date(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
