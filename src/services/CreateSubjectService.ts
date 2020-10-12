import { getRepository, getCustomRepository } from 'typeorm';
import Subjects from '../models/Subjects';
import Class from '../models/Class';
import SubjectRepository from '../repositories/subjectRepository';

class CreateSubjectService {
  public async execute(name : string): Promise<Subjects> {
    const subjectRepository = getCustomRepository(SubjectRepository);
    const subjectVerify = await subjectRepository.verifyNameSubcject(name);
    if (subjectVerify) {
      throw new Error('Aready subject.');
    }
    const subject = await subjectRepository.create({
      name,
    });
    await subjectRepository.save(subject);
    return subject;
  }

  public async list(): Promise<Subjects[]> {
    const subjectRepository = getRepository(Subjects);
    const subjects = await subjectRepository.find();
    return subjects;
  }

  public async delete(id:string) {
    const subjectRepository = getRepository(Subjects);
    const subjectRemove = await subjectRepository.findOne({ where: { id } });
    if (!subjectRemove) {
      throw new Error('Subject already.');
    }
    const classRepository = getRepository(Class);
    const classSubjects = await classRepository.findOne({ where: { subject_id: id } });
    if (classSubjects) {
      throw new Error('Subject linked to class, it is not possible to exclude. ');
    }
    await subjectRepository.remove(subjectRemove);
  }

  public async update(id: string, name:string): Promise<Subjects | undefined> {
    const subjectRepository = getCustomRepository(SubjectRepository);
    const subject = await subjectRepository.findOne({ where: { id } });
    if (!subject) {
      throw new Error('Subject does not exist.');
    }
    const subjectVerify = await subjectRepository.verifyNameSubcject(name, id);
    if (subjectVerify) {
      throw new Error('Aready subject.');
    }
    subjectRepository.update({ id }, {
      name,
    });
    const subjectUpdate = await subjectRepository.findOne({ where: { id } });
    return subjectUpdate;
  }
}
export default CreateSubjectService;
