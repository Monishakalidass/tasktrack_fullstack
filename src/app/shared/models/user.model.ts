import { Department } from '../enums/department.enum';

// Matches your SignupRequestDto.java
export interface SignupRequest {
  userName: string;
  email: string;
  password: string;
  department: Department;
}

// Matches your UserResponseDto.java (for when the API returns data)
export interface UserResponse {
  userId: number;
  userName: string;
  email: string;
  role: string;
  department: Department;
}
