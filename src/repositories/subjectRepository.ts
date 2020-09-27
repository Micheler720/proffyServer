import { EntityRepository, Repository } from 'typeorm';
import Subject from '../models/subjects';

@EntityRepository(Subject)
class SubjectRepository extends Repository<Subject> {

}
export default SubjectRepository;
