import express from "express";
const router = express.Router();

import contactsOperations from "../../models/contacts.js";
import contactsController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import {
  movieAddSchema,
  movieUpdateSchema,
} from "../../schemas/contacts-schemas.js";

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", validateBody(movieAddSchema), contactsController.addContact);

router.delete("/:contactId", contactsController.removeContactById);

router.put(
  "/:contactId",
  validateBody(movieUpdateSchema),
  contactsController.updateContactById
);

export default router;
