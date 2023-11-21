import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

// will call controller func --> from student.controller file
router.post("/create-student", StudentController.createStudent);

router.get("/", StudentController.getAllStudents);

router.get('/:studentId', StudentController.getSingleStudent )

router.delete("/:studentId", StudentController.deleteStudent);

export const StudentRoutes = router;
