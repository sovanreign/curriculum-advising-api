import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CoachesService } from 'src/coaches/coaches.service';
import { DeansService } from 'src/deans/deans.service';
import { StudentsService } from 'src/students/students.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private deansService: DeansService,
    private coachesService: CoachesService,
    private studentsService: StudentsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string, role: Role): Promise<any> {
    let user: any;

    switch (role) {
      case Role.DEAN:
        user = await this.deansService.findOneByUsername(username);
        break;
      case Role.COACH:
        user = await this.coachesService.findOneByUsername(username);
        break;
      case Role.STUDENT:
        user = await this.studentsService.findOneByUsername(username);
        break;
    }

    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getProfile(id: number) {
    return this.deansService.findOne(id);
  }
}
