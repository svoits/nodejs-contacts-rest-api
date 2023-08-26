const express = require("express");

const controller = require("../../controllers/contacts");

const {
  validateBody,
  isValidId,
  validateUpdateStatusContact,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, controller.listContacts);

router.get("/:contactId", authenticate, isValidId, controller.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  controller.addContact
);

router.delete("/:contactId", authenticate, isValidId, controller.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  controller.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateUpdateStatusContact(schemas.updateFavoriteSchema),
  controller.updateStatusContact
);

module.exports = router;
