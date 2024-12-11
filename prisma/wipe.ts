import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Perform deletion operations
    await prisma.dean.deleteMany();
    await prisma.program.deleteMany();
    await prisma.department.deleteMany();

    console.log('ALL DATA IS DELETED');
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  }
}

// Execute the main function
main();
