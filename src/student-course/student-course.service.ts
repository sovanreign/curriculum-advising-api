import { Injectable } from '@nestjs/common';
import { CreateStudentCourseDto } from './dto/create-student-course.dto';
import { UpdateStudentCourseDto } from './dto/update-student-course.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentCourseService {
  constructor(private db: DatabaseService) {}

  create(createStudentCourseDto: CreateStudentCourseDto) {
    return this.db.studentCourse.create({
      data: createStudentCourseDto,
    });
  }

  findAll(courseId?: number) {
    let where: Prisma.StudentCourseWhereInput = {};

    if (courseId) {
      where = {
        courseId,
      };
    }

    return this.db.studentCourse.findMany({
      where,
      include: {
        course: true,
        student: {
          include: {
            program: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.db.studentCourse.findUniqueOrThrow({
      where: { id },
      include: {
        course: true,
      },
    });
  }

  update(id: number, updateStudentCourseDto: UpdateStudentCourseDto) {
    return this.db.studentCourse.update({
      where: { id },
      data: updateStudentCourseDto,
    });
  }

  remove(id: number) {
    return this.db.studentCourse.delete({ where: { id } });
  }
}
