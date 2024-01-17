import express from "express";
const router = express.Router();

import contactsController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactPatchSchema,
} from "../../models/contacts.js";

import { isValidId, authenticate, upload } from "../../middleware/index.js";

router.use(authenticate);

router.get("/", contactsController.getAll);
router.get("/:contactId", isValidId, contactsController.getById);
// явно вказуємо в міділварі в якому полі буде файл
// upload.array("poster", 8) - 8 файлів Постер прийшли
// upload.fields([{name: "poster", maxCount: 1}]) - декілька файлів прийшли Постер один і Макс Каунт другий
router.post(
  "/",
  upload.single("poster"), //явно вказуємо в міділварі в якому полі буде файл - в полі Постер один файл
  validateBody(contactAddSchema),
  contactsController.addContact
);
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
