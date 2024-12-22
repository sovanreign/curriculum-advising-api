import { PrismaClient } from '@prisma/client';
import { passwordEncryption } from '../src/utils/password-encryption.util';

const prisma = new PrismaClient();

async function main() {
  await prisma.department.create({
    data: {
      code: 'SCIS',
      name: 'School of Computer in Information Sciences',
    },
  });

  const pass = await passwordEncryption('password');
  await prisma.dean.create({
    data: {
      username: 'admin',
      password: pass,
      firstName: 'Mark',
      lastName: 'Zuckerberg',
      deanId: '01-1947',
      email: 'metaverse@gmail.com',
      address: 'Silicon Valley',
      contact: '+0187654321',
      departmentId: 1,
    },
  });

  const programs = [
    {
      uniqueId: 'ACT',
      code: 'ACT',
      name: 'Associate in Computer Technology',
      departmentId: 1,
    },
    {
      uniqueId: 'BLIS',
      code: 'BLIS',
      name: 'Bachelor of Library Information Science',
      departmentId: 1,
    },
    {
      uniqueId: 'BSIT',
      code: 'BSIT',
      name: 'Bachelor of Science in Information Technology',
      departmentId: 1,
    },
    {
      uniqueId: 'BSCS',
      code: 'BSCS',
      name: 'Bachelor of Science in Computer Science',
      departmentId: 1,
    },
  ];

  await prisma.program.createMany({
    data: programs,
  });

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
