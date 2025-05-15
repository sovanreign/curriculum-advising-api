import { PrismaClient } from '@prisma/client';
import { passwordEncryption } from '../src/utils/password-encryption.util';

const prisma = new PrismaClient();

async function main() {
  await prisma.schoolTerm.createMany({
    data: [
      {
        sy: 'SY24-25',
        semester: 'FIRST',
      },
      {
        sy: 'SY24-25',
        semester: 'SECOND',
      },
    ],
  });

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

  await prisma.head.create({
    data: {
      username: 'head',
      password: pass,
      firstName: 'Elon',
      lastName: 'Musk',
      headId: '01-1999',
      email: 'spacex@gmail.com',
      address: 'Silicon Valley',
      contact: '+0187654321',
      departmentId: 1,
    },
  });

  await prisma.curriculum.create({
    data: {
      cmoName: 'KT',
      code: 'KT',
      effectivity: '1st sem 2024',
      rev: 50,
    },
  });

  const programs = [
    {
      uniqueId: 'BSIT',
      code: 'BSIT',
      name: 'Bachelor of Science in Information Technology',
      departmentId: 1,
    },
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
