import { Router } from 'express';

import userRouter from './user.routes';
import teamsRouter from './teams.routes';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);

export default router;
