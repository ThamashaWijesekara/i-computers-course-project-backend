//methana Student ta adala route ekk hdgnnw
import express from "express"
import { createStudent, getAllStudent } from "../controllers/studentController.js"


const studentRouter = express.Router()

studentRouter.get("/", getAllStudent)

studentRouter.post("/", createStudent)

export default studentRouter