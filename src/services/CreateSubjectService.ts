import { getRepository } from 'typeorm';
import Subject from '../models/Subjects';

class CreateSubjectService {
  public async execute(name : string): Promise<Subject> {
    const subjectRepository = getRepository(Subject);
    const verifySubject = await subjectRepository.findOne({ where: { name } });
    if (verifySubject) {
      throw new Error(' Subeject already');
    }
    const subject = await subjectRepository.create({
      name,
    });
    await subjectRepository.save(subject);
    return subject;
  }

  public async list(): Promise<Subject[]> {
    const subjectRepository = getRepository(Subject);
    const subjects = await subjectRepository.find();
    return subjects;
  }
}
export default CreateSubjectService;
