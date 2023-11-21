import Joi from "Joi";

// creating a schema validation using Joi npm package
// Joi schema for userName
const userNameJoiSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.base": "Invalid data type for Name",
      "string.max": "Name cannot be more than 20 characters",
      "string.pattern.base": "Invalid characters in First Name",
    }),
  middleName: Joi.string().trim(),
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),
});

// Joi schema for guardian
const guardianJoiSchema = Joi.object({
  father: Joi.string().required().messages({
    "string.empty": "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.empty": "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.empty": "Father's contact number is required",
  }),
  mother: Joi.string().required().messages({
    "string.empty": "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "string.empty": "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.empty": "Mother's contact number is required",
  }),
});

// Joi schema for localGuardian
const localGuardianJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    "string.empty": "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Local guardian's address is required",
  }),
});

// Joi schema for the main student
const studentJoiValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "Student ID is required",
  }),
  name: userNameJoiSchema.required().messages({
    "object.base": "Student name is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "string.empty": "Gender is required",
    "any.only": "Invalid gender value",
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact number is required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "string.empty": "Emergency contact number is required",
  }),
  bloodGroup: Joi.string().valid("A+", "A-", "B", "O-"),
  presentAddress: Joi.string().required().messages({
    "string.empty": "Present address is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "string.empty": "Permanent address is required",
  }),
  guardian: guardianJoiSchema.required().messages({
    "object.base": "Guardian information is required",
  }),
  localGuardian: localGuardianJoiSchema.required().messages({
    "object.base": "Local guardian information is required",
  }),
  profileImg: Joi.string().required().messages({
    "string.empty": "Profile image URL is required",
  }),
  isActive: Joi.string().valid("active", "blocked").default("active"),
});

export default studentJoiValidationSchema;