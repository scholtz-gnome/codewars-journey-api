import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Kyu } from '../types/kyu.enum';
import { Level } from '../types/level.enum';

@Entity()
@Unique('Challenge', ['url'])
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column()
  kyu: Kyu;

  @Column()
  level: Level;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
