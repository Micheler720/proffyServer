import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateClassServive from '../services/CreateClassService';

const classRoutes = Router();
classRoutes.use(ensureAuthenticated);

classRoutes.post('/', async (request, response) => {
  const {
    user_id, Schedules, subject_id, cost,
  } = request.body;
  try {
    const classCreate = new CreateClassServive();
    const classStudy = await classCreate.execute({
      user_id, Schedules, subject_id, cost,
    });
    return response.json(classStudy);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
classRoutes.get('/', async (request, response) => {
  const { id } = request.query;
  try {
    const CreateClassService = new CreateClassServive();
    const classUnit = await CreateClassService.ListClass(id as string);
    return response.json(classUnit);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

classRoutes.get('/weekDay', async (request, response) => {
  const { week_day, time, subject_id } = request.body;
  try {
    const classService = new CreateClassServive();
    const scheduleDisponible = await classService.ListClassWeekDayHour({
      week_day, time, subject_id,
    });
    return response.json(scheduleDisponible);
  } catch (err) {
    return response.status(400).json({ error: `${err.message}` });
  }
});

export default classRoutes;
