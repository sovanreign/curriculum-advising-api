import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DepartmentsModule } from './departments/departments.module';
import { ProgramsModule } from './programs/programs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    DepartmentsModule,
    ProgramsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
