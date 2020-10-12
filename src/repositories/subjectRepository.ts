import { EntityRepository, Repository } from 'typeorm';
import Subjects from '../models/Subjects';

@EntityRepository(Subjects)
class SubjectRepository extends Repository<Subjects> {
  public async verifyNameSubcject(name:string, id?: string): Promise<Subjects | undefined> {
    let subjectExist:Subjects | undefined;
    if (id) {
      subjectExist = await this.createQueryBuilder('Subjects')
        .where('Subjects.name = :name')
        .andWhere('Subjects.id != :id')
        .setParameters({ name, id })
        .getOne();
    } else {
      subjectExist = await this.createQueryBuilder('Subjects')
        .where('Subjects.name = :name')
        .setParameters({ name })
        .getOne();
    }
    return subjectExist;
  }
}
export default SubjectRepository;
