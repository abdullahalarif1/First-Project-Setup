import { StudentModel } from "../student.model&schema";
import { Student } from "./student.interface";

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student); // mongoose function create
  return result;
};

// get all students
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// get all students
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
