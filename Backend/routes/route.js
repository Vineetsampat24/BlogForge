import express from 'express'
import { create, deletion, retreive, updation } from '../controllers/controller.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

const router=express.Router()

router.get("/fetch",retreive)
router.post("/send",auth,admin,create)
router.put("/update/:id",auth,admin,updation)
router.delete("/delete/:id",auth,admin,deletion)

export default router