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
} from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';

@Controller('api/coaches')
export class CoachesController {
  constructor(private readonly coachesService: CoachesService) {}

  @Post()
  create(@Body() createCoachDto: CreateCoachDto) {
    return this.coachesService.create(createCoachDto);
  }

  @Get()
  findAll(
    @Query('q') q: string,
    @Query('filterByProgram') filterByProgram: string,
  ) {
    return this.coachesService.findAll(q, filterByProgram);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
    return this.coachesService.update(+id, updateCoachDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachesService.remove(+id);
  }
}
