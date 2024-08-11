import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customers";
import { v_PostCustomer, v_UpdateCustomer } from "../middleware/validateCustomer";

const router = express.Router();

router.get("/customers/", getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers/", ...v_PostCustomer, createCustomer);
router.patch("/customers/:id", ...v_UpdateCustomer, updateCustomer);
router.delete("/customers/:id", deleteCustomer);

export default router;
