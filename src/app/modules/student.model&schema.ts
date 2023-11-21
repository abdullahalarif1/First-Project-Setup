import { Schema, model } from "mongoose";
// import validator from "validator";
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student/student.interface";
import bcrypt from "bcrypt";

// for student schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true, // Custom error message
    // trim: true, // space remover
    // maxlength: [20, "First Name can not be more than 20 characters"],
    // // validation with validator npm package ---->
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid First Name'
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"], // Custom error message for required field
  },
});

// guardian Schema for student schema
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

// localGuardian Schema for student schema
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

// ---------------------- Main student schema ------------------------

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: userNameSchema,
      required: [true, "Student name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not a valid gender", // Custom error message for enum validation
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      // validation with validator npm package ---->
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: "{VALUE} is not valid email",
      // },
    },
    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
    },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B", "O-"],
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information is required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local guardian information is required"],
    },
    profileImg: {
      type: String,
      required: [true, "Profile image URL is required"],
    },
    isActive: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual ---> field 3 ta add kore full name kora jay.
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pore save middleware/ hook : will work on create() save() func --> pre hook use kore current document save howar age database e hash password update hoye gese----------------------------------------------------------
studentSchema.pre("save", async function (next) {
  // console.log(this, "pre hook: we will save the data");
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );
  next();
});

// post save middleware / hook
studentSchema.post("save", function (doc, next) {
  // console.log(this, "post hook: we saved our data");
  doc.password = "";
  next();
});

// Query Middleware----------------------------------------------->
// deleted true document data gula jate na dey. whole find er jonno
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

// single id dite hit korle deleted true document data gula jate na dey
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

//aggregate diye  isDeleted true document data gula jate na dey
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
