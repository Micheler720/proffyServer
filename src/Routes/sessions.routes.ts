import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const userAuthenticate = new AuthenticateUserService();
    const { user, token } = await userAuthenticate.execute({
      email,
      password,
    });
    delete user.password;
    return response.json({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});
export default sessionsRouter;
