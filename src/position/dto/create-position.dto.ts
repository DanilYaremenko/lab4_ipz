import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsString()
  @IsNotEmpty()
  responsibilities: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;
}
