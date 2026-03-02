export interface WorkflowStepTemplate {
  workflowStepName: string;
  workflowStepPosition: number;
}

export interface WorkflowTemplate {
  workflowTemplateId: number;
  workflowTemplateName: string;
  createdBy: string,
  createdAt: string,
  workflowSteps: WorkflowStepTemplate[];
}

/**
 * A generic API response wrapper to be reused across the app
 */
export interface ApiResponse<T> {
  message: string;
  error: string | null;
  status: 'OK' | 'ERROR' | string;
  timestamp: number;
  data: T;
}

// Specifically for this response:
export type WorkflowTemplateResponse = ApiResponse<WorkflowTemplate[]>;