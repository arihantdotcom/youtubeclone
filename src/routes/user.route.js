import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middle.js";
const router = Router();

router.route("/register").post(
  upload.single.fields([
    { name: "avtar", maxCount: 1 },
    {
      name: "coverimg",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;
