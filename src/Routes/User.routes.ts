import { Router } from 'express';
import CreateUsersService from '../services/CreateUserService';

const routes = Router();
const createUser = new CreateUsersService();
routes.post('/', async (request, response) => {
  const {
    name, email, password, surname,
  } = request.body;

  try {
    const user = await createUser.execute({
      name, email, password, surname,
    });
    delete user.password;
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ err: `${err.message}` });
  }
});

export default routes;
