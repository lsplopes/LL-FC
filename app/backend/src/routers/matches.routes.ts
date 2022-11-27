import { Router } from 'express';

import matchesController from '../controllers/matches.controller';
import { validateToken } from '../middlewares/user.middleware';
import checkTeams from '../middlewares/teams.middleware';

const router = Router();

router.get('/', matchesController.getAll);
router.post('/', validateToken, checkTeams, matchesController.createMatch);
router.patch('/:id/finish', matchesController.finishMatch);

export default router;
