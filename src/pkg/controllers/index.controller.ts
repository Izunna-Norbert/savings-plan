import Database from '../config/database.config';
import SavingsPlanRepo from '../repos/savingsPlan.repo';
import UserRepo from '../repos/user.repo';
import SavingsPlanUsecase from '../usecases/savingsPlan.usecase';
import UserUsecase from '../usecases/user.usecase';
import SavingsPlanController from './savings.controller';
import UserController from './user.controller';

const Pkgs = {
  UserPkg: new UserController(new UserUsecase(new UserRepo(Database))),
  SavingsPlanPkg: new SavingsPlanController(new SavingsPlanUsecase(new SavingsPlanRepo(Database), new UserRepo(Database))),
};

export default Pkgs;
