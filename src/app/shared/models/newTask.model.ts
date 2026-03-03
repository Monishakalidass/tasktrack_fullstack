import { Priority, TaskStatus } from "./workflow.model";

export interface NewTaskData {
  title: string;
  assignedToUserId: number | null;
  status: TaskStatus;
  priority: Priority;
  description: string;
  workflowStepId: number;
  dueDate: string;
}