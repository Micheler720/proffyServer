import { EntityRepository, Repository } from 'typeorm';
import Class from '../models/Class';
import { RequestFindScheduleWeekDay } from '../services/CreateClassService';
import convertHourToMinute from '../Utils/convertHourToMinutes';

@EntityRepository(Class)
class ClassRepository extends Repository<Class> {
  public async findScheduleWeekDay({
    week_day, time, subject_id,
  }: RequestFindScheduleWeekDay): Promise<Class[]> {
    const timeMinutes = convertHourToMinute(time);
    const qb = await this.createQueryBuilder('Class')
      .select('Class.user_id')
      .innerJoin('Class.classSchedules', 'ClassSchedules')
      .where('ClassSchedules.to >= :timeMinutes ', { timeMinutes })
      .andWhere('ClassSchedules.from <= :timeMinutes ', { timeMinutes })
      .andWhere('Class.subject_id = :subject', { subject: subject_id })
      .andWhere('ClassSchedules.week_day = :weekDay ', { weekDay: week_day });
    const classes = this.createQueryBuilder('Class')
      .innerJoinAndSelect('Class.classSchedules', 'ClassSchedules')
      .where(`Class.user_id in (${qb.getQuery()})`)
      .setParameters(qb.getParameters())
      .getMany();
    return classes;
  }
}
export default ClassRepository;
