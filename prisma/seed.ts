import { PrismaClient } from '@prisma/client';
import { passwordEncryption } from 'src/utils/password-encryption.util';

const prisma = new PrismaClient();

async function main() {
  try {
    // Seed the database with departments
    await prisma.department.createMany({
      skipDuplicates: true,
      data: [
        { code: 'CCS', name: 'College of Computer Studies' },
        { code: 'CAS', name: 'College of Arts and Sciences' },
        { code: 'COE', name: 'College of Engineering' },
        { code: 'CCJE', name: 'College of Criminal Justice Education' },
        { code: 'CBM', name: 'College of Business and Management' },
        { code: 'CAF', name: 'College of Accountancy and Finance' },
        { code: 'CTED', name: 'College of Teacher Education' },
        { code: 'CHS', name: 'College of Health Sciences' },
      ],
    });

    await prisma.program.createMany({
      skipDuplicates: true,
      data: [
        {
          uniqueId: 'BSCS',
          code: 'BSCS',
          name: 'Bachelor of Science in Computer Science',
          departmentId: 5,
        },
        {
          uniqueId: 'BSIS',
          code: 'BSIS',
          name: 'Bachelor of Science in Information Systems',
          departmentId: 5,
        },
        {
          uniqueId: 'BSIT',
          code: 'BSIT',
          name: 'Bachelor of Science in Information Technology',
          departmentId: 5,
        },
        {
          uniqueId: 'ACT',
          code: 'ACT',
          name: 'Associate in Computer Technology',
          departmentId: 5,
        },
      ],
    });

    const password = await passwordEncryption('password');
    await prisma.dean.createMany({
      skipDuplicates: true,
      data: [
        {
          username: 'batman',
          email: 'brucewayne@email.com',
          password: password,
          firstName: 'Bruce',
          lastName: 'Wayne',
          deanId: '20-0435',
          contact: '01934827628',
          address: 'Gotham City',
          departmentId: 5,
        },
      ],
    });

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  }
}

// Execute the main function
main();
