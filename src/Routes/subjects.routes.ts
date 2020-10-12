import { Router } from 'express';
import CreateSubjectService from '../services/CreateSubjectService';

const routes = Router();
routes.post('/', async (request, response) => {
  const { name } = request.body;
  try {
    const subjectService = new CreateSubjectService();
    const subject = await subjectService.execute(name);
    return response.json({ subject });
  } catch (err) {
    return response.status(400).json({ err: `${err.message}` });
  }
});
routes.get('/', async (request, response) => {
  try {
    const subjectService = new CreateSubjectService();
    const subjects = await subjectService.list();
    return response.json({ subjects });
  } catch (err) {
    return response.status(400).json({ err: `${err.message}` });
  }
});
routes.delete('/', async (request, response) => {
  const { id } = request.query;
  try {
    const createServiceSubject = new CreateSubjectService();
    await createServiceSubject.delete(id as string);
    return response.json({ message: 'Subject delete success.' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
routes.put('/', async (request, response) => {
  const { id, name } = request.query;
  try {
    const subjectService = new CreateSubjectService();
    const subjectUpdate = await subjectService.update(id as string, name as string);
    return response.json(subjectUpdate);
  } catch (err) {
    return response.status(400).json({ errr: err.message });
  }
});
export default routes;
