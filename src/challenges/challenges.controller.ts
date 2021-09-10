import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenge } from './entities/challenge.entity';
import { Kyu } from './types/kyu.enum';
import { Level } from './types/level.enum';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  async create(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<{ challenge: Challenge }> {
    try {
      const challenge = await this.challengesService.create(createChallengeDto);

      return { challenge };
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(['That challenge already exists']);
      }
      console.log(error);
    }
  }

  @Get()
  async findAll(
    @Query('kyus') kyus: Kyu[],
    @Query('levels') levels: Level[],
  ): Promise<{ challenges: Challenge[] }> {
    const challenges = await this.challengesService.findAll(kyus, levels);

    return { challenges };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.challengesService.update(+id, updateChallengeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengesService.remove(+id);
  }
}
