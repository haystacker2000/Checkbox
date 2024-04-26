import { IsArray, IsDate, IsDefined, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateOrUpdateTaskDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsDate()
  @Transform(({ value }) => (typeof value === 'string' ? new Date(value) : value), {
    toClassOnly: true,
  })
  dueAt: Date;
}

export class CreateTasksDto {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrUpdateTaskDto)
  tasks: CreateOrUpdateTaskDto[];
}
