// import { EntityRepository } from 'typeorm';

import { PrimaryGeneratedColumnUUIDOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions';

export interface Request{
  subject_id: string;
  week_day: number;
  time: string;
  user_id: PrimaryGeneratedColumnUUIDOptions;
}
// @EntityRepository(Class)
class ClassRepository {
  /* public async findClass({ subject_id, week_day, time }: Request): Promise<void> {
    const
  } */
}
export default ClassRepository;
