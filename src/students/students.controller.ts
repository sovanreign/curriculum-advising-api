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
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csv from 'csv-parser';
import { Readable } from 'stream';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Delete('bulk')
  async removeMany(@Body('ids') ids: number[]) {
    return this.studentsService.removeMany(ids);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadStudents(@UploadedFile() file: Express.Multer.File) {
    const records: any[] = [];
    const stream = Readable.from(file.buffer.toString());

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (row) => {
          records.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return this.studentsService.uploadStudents(records);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll(
    @Query('q') q: string,
    @Query('filterByYearLevel') filterByYearLevel: string,
    @Query('filterByProgram') filterByProgram: string,
  ) {
    return this.studentsService.findAll(q, filterByYearLevel, +filterByProgram);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
