import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StudentCourseService } from './student-course.service';
import { CreateStudentCourseDto } from './dto/create-student-course.dto';
import { UpdateStudentCourseDto } from './dto/update-student-course.dto';

@Controller('api/student-course')
export class StudentCourseController {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  @Post()
  create(@Body() createStudentCourseDto: CreateStudentCourseDto) {
    return this.studentCourseService.create(createStudentCourseDto);
  }

  @Get()
  findAll() {
    return this.studentCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentCourseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentCourseDto: UpdateStudentCourseDto,
  ) {
    return this.studentCourseService.update(+id, updateStudentCourseDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentCourseService.remove(+id);
  }
}
