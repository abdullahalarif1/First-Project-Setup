import { Request, Response } from "express";
import { StudentServices } from "./student.service";
// import studentJoiValidationSchema from "./student.validation";
import studentZodValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body; // name alias destructuring instead of req.body.student

    // // joi data validate send
    // const { error, value} = studentJoiValidationSchema.validate(studentData);
    // // console.log({ error }, { value});

    // if (error) {
    //   // send response postman
    //   res.status(500).json({
    //     success: false,
    //     message: "something went wrong", // show error on postman
    //     error: error.details,
    //   });
    // }

    // data validation using zod
    const zodParsedData = studentZodValidationSchema.parse(studentData);

    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // send response
    res.status(200).json({
      success: true,
      message: "student is created successfully",
      data: result,
    });
  } catch (err: any) {
    // send response to postman
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong", // show error on postman
      error: err,
    });
    // console.log(err);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    // send response
    res.status(200).json({
      success: true,
      message: "students are retrieve successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params; // need to match with route name.
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // send response
    res.status(200).json({
      success: true,
      message: "student is retrieve successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// delete student
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params; // need to match with route name.
    const result = await StudentServices.deleteStudentFromDB(studentId);
    // send response
    res.status(200).json({
      success: true,
      message: "student is deleted successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
