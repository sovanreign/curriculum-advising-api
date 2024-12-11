import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DatabaseService } from 'src/database/database.service';
import { passwordEncryption } from 'src/utils/password-encryption.util';

@Injectable()
export class StudentsService {
  constructor(private db: DatabaseService) {}

  async create(createStudentDto: CreateStudentDto) {
    createStudentDto.password = await passwordEncryption(
      createStudentDto.password,
    );

    return this.db.student.create({
      data: createStudentDto,
    });
  }

  findAll() {
    return this.db.student.findMany({
      include: {
        program: true,
      },
    });
  }

  findOne(id: number) {
    return this.db.student.findUniqueOrThrow({
      where: { id },
      include: {
        program: true,
      },
    });
  }

  findOneByUsername(username: string) {
    return this.db.student.findFirst({ where: { username } });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    if (
      updateStudentDto.password !== '' ||
      updateStudentDto.password !== null
    ) {
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
}
