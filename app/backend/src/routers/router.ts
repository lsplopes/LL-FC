import { Router } from 'express';

import userRouter from './user.routes';
import teamsRouter from './teams.routes';
import matchesRouter from './matches.routes';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
