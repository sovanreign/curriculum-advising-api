import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DepartmentsModule } from './departments/departments.module';
import { ProgramsModule } from './programs/programs.module';
import { DeansModule } from './deans/deans.module';
import { StudentsModule } from './students/students.module';
import { CoachesModule } from './coaches/coaches.module';
import { AuthModule } from './auth/auth.module';
import { AssignmentsModule } from './assignments/assignments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    DepartmentsModule,
    ProgramsModule,
    DeansModule,
    StudentsModule,
    CoachesModule,
    AuthModule,
    AssignmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
