import { Router } from 'express';

import leaderBoardController from '../controllers/leaderBoard.controller';

const router = Router();

router.get('/home', leaderBoardController.getHomeTeamLeaders);
router.get('/away', leaderBoardController.getAwayTeamLeaders);

export default router;
