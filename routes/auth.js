const express = require("express");
const controller = require("../controllers/auth");
const { validateBody, authenticate, upload } = require("../middlewares");
const { schemas } = require("../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controller.register
);

router.post("/login", validateBody(schemas.loginSchema), controller.login);

router.get("/current", authenticate, controller.getCurrent);

router.post("/logout", authenticate, controller.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  controller.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controller.updateAvatar
);

router.get("/verify/:verificationToken", controller.verification);

router.post(
  "/verify",
  validateBody(schemas.resendVerificationEmailSchema),
  controller.resendVerification
);

module.exports = router;
