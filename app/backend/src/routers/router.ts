import { Router } from 'express';

import userRouter from './user.routes';
import teamsRouter from './teams.routes';
import matchesRouter from './matches.routes';
import leaderBoardRouter from './leaderBoard.routes';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
