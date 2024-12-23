import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DatabaseService } from 'src/database/database.service';
import { passwordEncryption } from 'src/utils/password-encryption.util';
import { Prisma, YearLevel } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private db: DatabaseService) {}

  async uploadStudents(students: CreateStudentDto[]) {
    for (const student of students) {
      student.programId = Number(student.programId);
      student.password = await passwordEncryption(student.password); // This will now properly await
    }

    return this.db.student.createMany({
      data: students,
    });
  }

  async create(createStudentDto: CreateStudentDto) {
    createStudentDto.password = await passwordEncryption(
      createStudentDto.password,
    );

    return this.db.student.create({
      data: createStudentDto,
    });
  }

  findAll(q?: string, filterByYearLevel?: string, filterByProgram?: number) {
    const where: Prisma.StudentWhereInput = {};

    // Search query filter
    if (q) {
      where.OR = [
        {
          firstName: { contains: q, mode: 'insensitive' },
        },
        {
          lastName: { contains: q, mode: 'insensitive' },
        },
        {
          studentId: { contains: q, mode: 'insensitive' },
        },
      ];
    }

    // Year level filter
    if (
      filterByYearLevel &&
      Object.values(YearLevel).includes(filterByYearLevel as YearLevel)
    ) {
      where.yearLevel = filterByYearLevel as YearLevel;
    }

    // Program filter
    if (filterByProgram) {
      where.programId = filterByProgram;
    }

    return this.db.student.findMany({
      where,
      include: {
        program: true,
        assignment: {
          include: {
            coach: true,
          },
        },
        studentCourse: {
          include: {
            course: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.db.student.findUniqueOrThrow({
      where: { id },
      include: {
        program: true,
        assignment: {
          include: {
            coach: true,
          },
        },
        studentCourse: {
          include: {
            course: true,
          },
        },
      },
    });
  }

  findOneByUsername(username: string) {
    return this.db.student.findFirst({ where: { username } });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    if (updateStudentDto.password) {
      updateStudentDto.password = await passwordEncryption(
        updateStudentDto.password,
      );
    }

    return this.db.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  remove(id: number) {
    return this.db.student.delete({
      where: { id },
    });
  }

  async removeMany(ids: number[]) {
    return this.db.student.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
