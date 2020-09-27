import { getRepository } from 'typeorm';
import Class from '../models/Class';
import ClassSchedules from '../models/ClassSchedules';

// import ClassRepository, { Request } from '../repositories/ClassRepository';
export interface Request{
  user_id: string;
  Schedules: [
    {
      week_day: number,
      time: string,
    }
  ]
  subject_id: string;
  cost: number;
}
class CreateClassService {
  public async execute({
    user_id, Schedules, subject_id, cost,
  }: Request): Promise<Class[]> {
    const ClassRepository = getRepository(Class);
    const ClassScheduleRepository = getRepository(ClassSchedules);
    const verifyUserClass = await ClassRepository.findOne({
      where: { user_id },
    });
    if (!verifyUserClass) {
      throw new Error('User registration already exists');
    }
    const classStudy = ClassRepository.create({
      user_id,
      subject_id,
      cost,
    });
    await ClassRepository.save(classStudy);
    Schedules.map(async (schedule) => {
      const classSchedules = ClassScheduleRepository.create({
        time: schedule.time,
        week_day: schedule.week_day,
        class_id: classStudy.id,
      });
      await ClassScheduleRepository.save(classSchedules);
    });
    const result = await ClassRepository.find({ relations: ['classSchedules'] });
    return result;
  }
}

export default CreateClassService;
