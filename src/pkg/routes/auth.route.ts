import { IRouter, Router } from 'express';
import Pkgs from '../controllers/index.controller';
import validate from '../middlewares/validate';
import { createUserSchema } from '../schemas/user.schema';

const router: IRouter = Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
});
router.post('/register', validate(createUserSchema), Pkgs.UserPkg.createUser);
router.post('/login', Pkgs.UserPkg.loginUser);

export default router;
