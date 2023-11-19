import { Schema , model} from "mongoose";
import { Guardian, LocalGuardian, Student, UserName } from "./student/student.interface";

// for student schema
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  }, 
  lastName: {
    type: String,
    required: true,
  },
});

// for student schema
const guardianSchema = new Schema<Guardian>({
  father: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  mother: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});



// for student schema
const localGuardianSchema = new Schema<LocalGuardian>({
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  });



const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ["male", "female"], // enum process apply from interface union
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ["A+", "A-", "B", "O-"],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String, required: true },
  isActive: ["active", "blocked"], // enum process apply from interface union
});


export const StudentModel = model("Student", studentSchema);