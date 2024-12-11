import { Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { DatabaseService } from 'src/database/database.service';
import { passwordEncryption } from 'src/utils/password-encryption.util';

@Injectable()
export class CoachesService {
  constructor(private db: DatabaseService) {}

  async create(createCoachDto: CreateCoachDto) {
    createCoachDto.password = await passwordEncryption(createCoachDto.password);

    return this.db.coach.create({
      data: createCoachDto,
    });
  }

  findAll() {
    return this.db.coach.findMany({
      include: {
        program: true,
      },
    });
  }

  findOne(id: number) {
    return this.db.coach.findUniqueOrThrow({
      where: { id },
      include: {
        program: true,
      },
    });
  }

  async update(id: number, updateCoachDto: UpdateCoachDto) {
    if (updateCoachDto.password !== '' || updateCoachDto.password !== null) {
      updateCoachDto.password = await passwordEncryption(
        updateCoachDto.password,
      );
    }

    return this.db.coach.update({
      where: { id },
      data: updateCoachDto,
    });
  }

  remove(id: number) {
    return this.db.coach.delete({
      where: { id },
    });
  }
}
