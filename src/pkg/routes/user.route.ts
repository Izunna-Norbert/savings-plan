import { IRouter, Router, RouterOptions } from 'express';
import Pkgs from '../controllers/index.controller';
import { deserializeUser } from '../middlewares/deserialize';

const router: IRouter = Router();

router.use(deserializeUser);
router.get('/', Pkgs.UserPkg.getUser);
router.get('/my-plans', Pkgs.SavingsPlanPkg.getUserSavingsPlans);

export default router;
