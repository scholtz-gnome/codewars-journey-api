import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Kyu } from '../types/kyu.enum';
import { Level } from '../types/level.enum';

export class CreateChallengeDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @IsEnum(Kyu)
  @IsString()
  @IsNotEmpty()
  kyu: Kyu;

  @IsEnum(Level)
  @IsString()
  @IsNotEmpty()
  level: Level;
}
