import { Student } from "../student.model&schema";
import { TStudent } from "./student.interface";

// create students
const createStudentIntoDB = async (studentData: TStudent) => {
  // static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already exists!");
  }

  const result = await Student.create(studentData); // mongoose function create

  return result;
};

// get all students
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// get all students
const getSingleStudentFromDB = async (id: string) => {
  //   const result = await Student.findOne({ id });

  const result = await Student.aggregate([
    { $match: { id: id } }
]);
  return result;
};

// get all students
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true }); // id , ki delete hobe oita
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
