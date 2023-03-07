import { IRouter, Router } from "express";
import Pkgs from "../controllers/index.controller";
import { deserializeUser } from "../middlewares/deserialize";
import validate from "../middlewares/validate";
import { CreateSavingsPlanSchema, InviteToSavingsPlanSchema } from "../schemas/savingsPlan.schema";


const router: IRouter = Router();

router.use(deserializeUser);

router.post("/", validate(CreateSavingsPlanSchema), Pkgs.SavingsPlanPkg.createSavingsPlan);
router.get("/:id", Pkgs.SavingsPlanPkg.getSavingsPlan);
router.put("/:id/invite",validate(InviteToSavingsPlanSchema), Pkgs.SavingsPlanPkg.inviteBuddy);
router.post("/invitations/:id/accept", Pkgs.SavingsPlanPkg.acceptInvitation);
router.post("/invitations/:id/decline", Pkgs.SavingsPlanPkg.declineInvitation);
router.get("/invites/invitations", Pkgs.SavingsPlanPkg.getInvites);

export default router;
