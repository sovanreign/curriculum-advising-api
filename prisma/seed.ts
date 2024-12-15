import { PrismaClient } from '@prisma/client';
import { passwordEncryption } from '../src/utils/password-encryption.util';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Departments
  const ccsDepartment = await prisma.department.create({
    data: {
      code: 'CCS',
      name: 'College of Computer Studies',
    },
  });

  const coeDepartment = await prisma.department.create({
    data: {
      code: 'COE',
      name: 'College of Engineering',
    },
  });

  const cbmDepartment = await prisma.department.create({
    data: {
      code: 'CBM',
      name: 'College of Business and Management',
    },
  });

  const chsDepartment = await prisma.department.create({
    data: {
      code: 'CHS',
      name: 'College of Health Sciences',
    },
  });

  // Create Programs for each department
  const ccsProgram1 = await prisma.program.create({
    data: {
      uniqueId: 'CCS2024IT',
      code: 'BSIT',
      name: 'Bachelor of Science in Information Technology',
      departmentId: ccsDepartment.id,
    },
  });

  const ccsProgram2 = await prisma.program.create({
    data: {
      uniqueId: 'CCS2024CS',
      code: 'BSCS',
      name: 'Bachelor of Science in Computer Science',
      departmentId: ccsDepartment.id,
    },
  });

  const coeProgram1 = await prisma.program.create({
    data: {
      uniqueId: 'COE2024CE',
      code: 'BSCE',
      name: 'Bachelor of Science in Civil Engineering',
      departmentId: coeDepartment.id,
    },
  });

  const coeProgram2 = await prisma.program.create({
    data: {
      uniqueId: 'COE2024EE',
      code: 'BSEE',
      name: 'Bachelor of Science in Electrical Engineering',
      departmentId: coeDepartment.id,
    },
  });

  const cbmProgram1 = await prisma.program.create({
    data: {
      uniqueId: 'CBM2024BA',
      code: 'BSA',
      name: 'Bachelor of Science in Accountancy',
      departmentId: cbmDepartment.id,
    },
  });

  const cbmProgram2 = await prisma.program.create({
    data: {
      uniqueId: 'CBM2024BM',
      code: 'BSBM',
      name: 'Bachelor of Science in Business Management',
      departmentId: cbmDepartment.id,
    },
  });

  const chsProgram1 = await prisma.program.create({
    data: {
      uniqueId: 'CHS2024Nursing',
      code: 'BSN',
      name: 'Bachelor of Science in Nursing',
      departmentId: chsDepartment.id,
    },
  });

  const chsProgram2 = await prisma.program.create({
    data: {
      uniqueId: 'CHS2024Pharmacy',
      code: 'BSP',
      name: 'Bachelor of Science in Pharmacy',
      departmentId: chsDepartment.id,
    },
  });

  // Create Students (4 students per program)
  const students = [];

  for (const program of [
    ccsProgram1,
    ccsProgram2,
    coeProgram1,
    coeProgram2,
    cbmProgram1,
    cbmProgram2,
    chsProgram1,
    chsProgram2,
  ]) {
    for (let i = 1; i <= 4; i++) {
      students.push(
        await prisma.student.create({
          data: {
            username: `student${program.code}${i}`,
            email: `student${program.code}${i}@example.com`,
            password: await passwordEncryption('password123'),
            firstName: `First${i}`,
            lastName: `Last${i}`,
            studentId: `S-${program.code}-${i}`,
            yearLevel:
              i === 1
                ? 'FIRST'
                : i === 2
                  ? 'SECOND'
                  : i === 3
                    ? 'THIRD'
                    : 'FOURTH',
            programId: program.id,
          },
        }),
      );
    }
  }

  // Create Coaches (2 coaches per program)
  const coaches = [];

  for (const program of [
    ccsProgram1,
    ccsProgram2,
    coeProgram1,
    coeProgram2,
    cbmProgram1,
    cbmProgram2,
    chsProgram1,
    chsProgram2,
  ]) {
    for (let i = 1; i <= 2; i++) {
      coaches.push(
        await prisma.coach.create({
          data: {
            username: `coach${program.code}${i}`,
            email: `coach${program.code}${i}@example.com`,
            password: await passwordEncryption('password123'),
            firstName: `Coach${i}`,
            lastName: `Last${i}`,
            coachId: `C-${program.code}-${i}`,
            programId: program.id,
          },
        }),
      );
    }
  }

  // Assign students to their respective coach
  for (let i = 0; i < students.length; i++) {
    await prisma.assignment.create({
      data: {
        studentId: students[i].id,
        coachId: coaches[(i % 2) + Math.floor(i / 4) * 2].id, // Alternate between 2 coaches for each program
      },
    });
  }

  // Create Curriculum
  const curriculum = await prisma.curriculum.create({
    data: {
      code: 'CURR2024',
      rev: 1,
      effectivity: '2024',
      cmoName: 'CMO 2024 Curriculum',
    },
  });

  // Create Courses for each department
  const courses = [];

  for (const department of [
    ccsDepartment,
    coeDepartment,
    cbmDepartment,
    chsDepartment,
  ]) {
    for (let i = 1; i <= 3; i++) {
      courses.push(
        await prisma.course.create({
          data: {
            subject: `Course ${i} for ${department.name}`,
            description: `Description for course ${i} of ${department.name}`,
            units: 3,
            sem: 1,
            year: i === 1 ? 'FIRST' : i === 2 ? 'SECOND' : 'THIRD',
            curriculumId: curriculum.id,
            programId: (
              await prisma.program.findFirst({
                where: { departmentId: department.id },
              })
            ).id,
          },
        }),
      );
    }
  }

  // Enroll Students in their respective courses
  for (let i = 0; i < students.length; i++) {
    await prisma.studentCourse.create({
      data: {
        studentId: students[i].id,
        courseId: courses[i % 3].id, // Assign courses in a round-robin fashion
        remark: 'HOLD',
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
