import express from "express";
import { AuthController } from "../controllers";

const router = express.Router();

export default (() => {
  router.post("/logout", AuthController.logOutController);
  router.post("/login", AuthController.loginController);
  router.post("/refresh-token", AuthController.refreshTokenController);
  router.get("/user-info", AuthController.getUserInfoController);

  return router;
})();
