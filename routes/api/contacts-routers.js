import express from "express";
const router = express.Router();

import contactsController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactPatchSchema,
} from "../../models/contacts.js";

import { isValidId, authenticate } from "../../middleware/index.js";

router.use(authenticate);

router.get("/", contactsController.getAll);
router.get("/:contactId", isValidId, contactsController.getById);
router.post("/", validateBody(contactAddSchema), contactsController.addContact);
router.put(
  "/:contactId",
  isValidId,
  validateBody(contactUpdateSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validateBody(contactPatchSchema),
  contactsController.updateFavorite
);
router.delete("/:contactId", contactsController.removeContactById);

export default router;
