import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateConnectionUserService from '../services/CreateConnectionsUserService';
import User from '../models/Users';

const connectionsRouter = Router();
connectionsRouter.use(ensureAuthenticated);

connectionsRouter.put('/', async (request, response) => {
  const { userId } = request.body;
  try {
    const connectionCreate = new CreateConnectionUserService();
    const user = await connectionCreate.execute(userId);
    delete user.password;
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

connectionsRouter.get('/', async (request, response) => {
  const { userId } = request.body;
  try {
    const connectionCreate = getRepository(User);
    const user = await connectionCreate.findOne({ where: { id: userId } });
    return response.json({ connections: user?.connections });
  } catch (err) {
    return response.sendStatus(400).json({ Error: err.message });
  }
});

export default connectionsRouter;
