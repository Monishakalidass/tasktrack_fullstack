export interface TaskData {
  taskId: number;
  title: string;
  description: string;
  assignedToUser: number;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED'; // TaskStatus
  priority: 'LOW' | 'MEDIUM' | 'HIGH'; // Priority
  dueDate: string; // ISO Date string
  subTasks: SubTask[];
}

export interface SubTask {
  subTaskId: number;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
  title: string;
  assignedToUserId: AssignedUserInfo;
}

export interface AssignedUserInfo {
  userId: number;
  userName: string;
  email: string;
  department: string;
}