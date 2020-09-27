import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateClassServive from '../services/CreateClassService';

const classRoutes = Router();
classRoutes.use(ensureAuthenticated);
/* classRoutes.get('/', async (request, response) => {
  const { subject_id, week_day, time } = request.body;
  try {

  } catch (err) {
    return response.json({ Error: err.message });
  }
}); */

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

export default classRoutes;
