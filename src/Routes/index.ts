import { Router } from 'express';
import userRoute from './User.routes';
import connectionsRoutes from './Connections.routes';
import sessionsRouter from './sessions.routes';
import subjectsRouter from './subjects.routes';
import classRouter from './Class.routes';

const routes = Router();

routes.use('/users', userRoute);
routes.use('/connections', connectionsRoutes);
routes.use('/subjects', subjectsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/class', classRouter);
export default routes;
