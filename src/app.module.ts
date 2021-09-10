import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [
    ChallengesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'stephenscholtz',
      password: 'postgres',
      database: 'codewars_journey_dev',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
