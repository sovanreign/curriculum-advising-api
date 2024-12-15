import { Injectable } from '@nestjs/common';
import { CreateStudentCourseDto } from './dto/create-student-course.dto';
import { UpdateStudentCourseDto } from './dto/update-student-course.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StudentCourseService {
  constructor(private db: DatabaseService) {}

  create(createStudentCourseDto: CreateStudentCourseDto) {
    return this.db.studentCourse.create({
      data: createStudentCourseDto,
    });
  }

  findAll() {
    return this.db.studentCourse.findMany();
  }

  findOne(id: number) {
    return this.db.studentCourse.findUniqueOrThrow({
      where: { id },
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
