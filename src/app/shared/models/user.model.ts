import { Department } from "../enums/department.enum";
import { Role } from "../enums/role.enum";
import { Status } from "../enums/status.enum";

export interface CustomJSONResponse<T> {
  message: string;
  errors: any;
  status: string; // Matches your CustomStatus.OK
  data: T;        // This is where your token string lives
}

// export enum Department {
//   IT = 'IT',
//   HR = 'HR',
//   SALES = 'SALES',
//   MARKETING = 'MARKETING',
//   OPERATIONS = 'OPERATIONS'
// }

export interface UserActivationDto {
  role: Role;      // Matches @NotNull private Role role;
  status: Status;  // Matches @NotNull private Status status;
}

// export enum Role {
//   ADMIN = 'ADMIN',
//   MANAGER = 'MANAGER',
//   EMPLOYEE = 'EMPLOYEE'
// }

// export enum Status {
//   ACTIVE = 'ACTIVE',
//   INACTIVE = 'INACTIVE',
//   PENDING = 'PENDING',
//   SUSPENDED = 'SUSPENDED'
// }

// Mirroring your UserResponseDto
export interface UserResponseDto {
  userId: number;
  userName: string;
  email: string;
  role: Role;
  department: Department;
  status: Status;
}