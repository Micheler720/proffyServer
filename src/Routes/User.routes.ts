import { Router } from 'express';
import CreateUsersService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();
const createUser = new CreateUsersService();
routes.post('/', async (request, response) => {
  const {
    name, email, password, surname, biografia, whatsapp,
  } = request.body;

  try {
    const user = await createUser.execute({
      name, email, password, surname, biografia, whatsapp,
    });
    delete user.password;
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ err: `${err.message}` });
  }
});

routes.put('/', ensureAuthenticated, async (request, response) => {
  const {
    id, name, surname, biografia, whatsapp, password, email,
  } = request.body;
  try {
    const userCreate = new CreateUsersService();
    const userUpdate = await userCreate.update({
      id, name, surname, biografia, whatsapp, password, email,
    });
    delete userUpdate.password;
    return response.json(userUpdate);
  } catch (err) {
    return response.status(400).json({ error: `${err.message}` });
  }
});

export default routes;
