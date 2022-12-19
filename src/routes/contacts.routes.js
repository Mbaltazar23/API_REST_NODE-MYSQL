import { Router } from "express";
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contacts.controllers.js";

const router = Router();

router.get("/contacts", getContacts);

router.get("/contacts/:id", getContact);

router.post("/contacts", createContact);

router.patch("/contacts/:id", updateContact);

router.delete("/contacts/:id", deleteContact);

export default router;
