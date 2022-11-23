import { Router } from 'express';
import validateBody from '../middlewares/user.middleware';

import userController from '../controllers/user.controller';

const router = Router();

router.post('/', validateBody, userController.login);

export default router;
