export enum Status {
  Pending = "PENDING",
  Open = "OPEN",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED"
}

export interface UserDTO {
  userId: number;
  userName: string;
  email: string;
  department:  string; // Keeping it flexible but noting IT as the default
}

export interface SubTaskDTO {
  subTaskId: number;
  status: Status;
  title: string;
  assignedToUserId: UserDTO;
}

export interface TaskDTO {
  taskId: number;
  title: string;
  description: string;
  assignedToUser: UserDTO;
  createdByUser: UserDTO;
  subTasks: SubTaskDTO[];
}

export interface WorkflowStepDTO {
  workflowStepId: number;
  stepName: string;
  status: Status;
  task: TaskDTO[];
}

export interface WorkflowDTO {
  workflowId: number;
  workflowName: string;
  currentStep: number;
  status: Status;
  workflowSteps: WorkflowStepDTO[];
}