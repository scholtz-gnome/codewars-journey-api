import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './entities/challenge.entity';
import { Kyu } from './types/kyu.enum';
import { Level } from './types/level.enum';

@EntityRepository(Challenge)
export class ChallengesRepository extends Repository<Challenge> {
  async createChallenge(
    createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    const challenge = this.create(createChallengeDto);

    await this.save(challenge);

    return challenge;
  }

  async findChallenges(kyus: Kyu[], levels: Level[]): Promise<Challenge[]> {
    let query: SelectQueryBuilder<Challenge>;

    if (typeof kyus === 'string') {
      if (typeof levels === 'string') {
        query = this.createQueryBuilder('challenge')
          .select()
          .where({ kyu: kyus })
          .andWhere({ level: levels });
      } else if (Array.isArray(levels)) {
        query = this.createQueryBuilder('challenge')
          .select()
          .where({ kyu: kyus })
          .andWhere('challenge.level IN (:...levels)', { levels });
      } else {
        query = this.createQueryBuilder('challenge')
          .select()
          .where({ kyu: kyus });
      }
    } else if (Array.isArray(kyus)) {
      if (typeof levels === 'string') {
        query = this.createQueryBuilder('challenge')
          .select()
          .where('challenge.kyu IN (:...kyus)', { kyus })
          .andWhere({ level: levels });
      } else if (Array.isArray(levels)) {
        query = this.createQueryBuilder('challenge')
          .select()
          .where('challenge.kyu IN (:...kyus)', { kyus })
          .andWhere('challenge.level IN (:...levels)', { levels });
      } else {
        query = this.createQueryBuilder('challenge')
          .select()
          .where('challenge.kyu IN (:...kyus)', { kyus });
      }
    } else {
      if (typeof levels === 'string') {
        query = this.createQueryBuilder('challenge')
          .select()
          .where({ level: levels });
      } else if (Array.isArray(levels)) {
        query = this.createQueryBuilder('challenge')
          .select()
          .andWhere('challenge.level IN (:...levels)', { levels });
      } else {
        query = this.createQueryBuilder('challenge').select();
      }
    }

    const challenges = await query.getMany();

    return challenges;
  }
}
