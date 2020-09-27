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
export default routes;
