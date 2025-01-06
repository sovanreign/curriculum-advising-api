import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAcadformDto {
  @IsString()
  @IsNotEmpty()
  recommendation: string;

  @IsInt()
  @IsNotEmpty()
  studentId: number;
}
