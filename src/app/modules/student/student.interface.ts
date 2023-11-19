
// for student schema
export type Guardian = {
  father: string;
  fatherOccupation: string;
  fatherContactNo: string;
  mother: string;
  motherOccupation: string;
  motherContactNo: string;
};

// for student schema
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// for student schema
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: "male" | "female";
  dateOfBirth?: string;
  email: string;
  avatar?: string;
  contactNo: string;
  emergencyContactNo?: string;
  bloodGroup: "A+" | "A-" | "B" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: "active" | "blocked";
};
