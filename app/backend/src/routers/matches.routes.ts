import { Router } from 'express';

import matchesController from '../controllers/matches.controller';
import { validateToken } from '../middlewares/user.middleware';

const router = Router();

router.get('/', matchesController.getAll);
router.post('/', validateToken, matchesController.createMatch);

export default router;
