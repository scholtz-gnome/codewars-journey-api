import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengesRepository } from './challenges.repository';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenge } from './entities/challenge.entity';
import { Kyu } from './types/kyu.enum';
import { Level } from './types/level.enum';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(ChallengesRepository)
    private challengesRepository: ChallengesRepository,
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    const challenge =
      this.challengesRepository.createChallenge(createChallengeDto);
    return challenge;
  }

  async findAll(kyus: Kyu[], levels: Level[]): Promise<Challenge[]> {
    return await this.challengesRepository.findChallenges(kyus, levels);
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
