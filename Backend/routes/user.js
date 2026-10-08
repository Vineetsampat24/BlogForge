import express from 'express'
import { getUsers, login, signup, updateUserRole } from '../controllers/user.js'
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router=express.Router()

router.post("/user/signup",signup)
router.post("/user/login",login)
router.get("/users", auth, admin, getUsers);
router.patch("/users/:id/role", auth, admin, updateUserRole);

export default router