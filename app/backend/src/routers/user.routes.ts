import { Router } from 'express';
import { validateBody, validateToken } from '../middlewares/user.middleware';

import userController from '../controllers/user.controller';

const router = Router();

router.post('/', validateBody, userController.login);
router.get('/validate', validateToken, userController.loginValidation);

export default router;
