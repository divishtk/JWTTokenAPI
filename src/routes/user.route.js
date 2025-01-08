import { Router } from "express";
import { loginUser, registerUser ,getAllUsers, checkProfile} from "../controllers/users.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import authJWTMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "frontPic",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route('/login').post(loginUser)
router.route('/getUsers').get((authJWTMiddleware),getAllUsers)
router.route('/checkProfile').get((authJWTMiddleware),checkProfile)



export default router;
