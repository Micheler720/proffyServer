import { getRepository, getCustomRepository } from 'typeorm';
import Class from '../models/Class';
import CreateClassSchedulesService, { Schedule } from './CreateClassScheduleService';
import ClassRepository from '../repositories/ClassRepository';

export interface Request{
  user_id: string;
  Schedules: Schedule[];
  subject_id: string;
  cost?: number;
  created_at?: Date;
  updated_at?: Date;
  id?: string,
}
export interface RequestFindScheduleWeekDay{
  week_day: number;
  time: string;
  subject_id: string;
}

class CreateClassService {
  public async execute({
    user_id, Schedules, subject_id, cost,
  }: Request): Promise<Request> {
    const classRepository = getRepository(Class);
    const verifyUserClass = await classRepository.findOne({
      where: { user_id },
    });
    if (verifyUserClass) {
      throw new Error('User registration already exists');
    }
    const classStudy = classRepository.create({
      user_id,
      subject_id,
      cost,
    });
    const createClassSchedules = new CreateClassSchedulesService();
    const createSchedules = createClassSchedules.verifySchedules(Schedules);
    if (createSchedules) {
      await classRepository.save(classStudy);
      await createClassSchedules.create(createSchedules, classStudy);
    }
    const classe = this.ListClass(classStudy.id);
    return classe;
  }

  public async ListClass(id: string): Promise<Request> {
    const classRepository = getRepository(Class);
    const classUnit = await classRepository.findOne({ relations: ['classSchedules'], where: { id } });
    if (!classUnit) {
      throw new Error('Class not found');
    }
    return this.convertClass(classUnit);
  }

  private convertClass(classUnit: Class): Request {
    const classSchedulesService = new CreateClassSchedulesService();
    const schedulesHour = classSchedulesService.convertSchedules(classUnit.classSchedules);
    return {
      id: classUnit.id,
      cost: classUnit.cost,
      subject_id: classUnit.subject_id,
      user_id: classUnit.user_id,
      Schedules: schedulesHour,
      created_at: classUnit.created_at,
      updated_at: classUnit.updated_at,
    };
  }

  public async ListClassWeekDayHour({
    week_day, time, subject_id,
  }: RequestFindScheduleWeekDay): Promise<Request []> {
    const classRepository = getCustomRepository(ClassRepository);
    const classSchedules = await classRepository.findScheduleWeekDay({
      week_day, time, subject_id,
    });
    const classes = classSchedules.map((classSchedule) => this.convertClass(classSchedule));
    return classes;
  }
}

export default CreateClassService;
