import { IsArray, IsDate, IsDefined, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  dueAt: Date;
}

export class CreateTasksDto {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  tasks: CreateTaskDto[];
}
