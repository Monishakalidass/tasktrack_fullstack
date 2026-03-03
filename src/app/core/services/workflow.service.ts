import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomJSONResponse } from '../../shared/models/user.model';
import { WorkflowDTO, WorkflowStepStatus } from '../../shared/models/workflow.model';
import { environment } from '../../environments/environment';

export interface UpdateWorkflowStepRequest {
  stepStatus: WorkflowStepStatus;
  taskId?: number;
  message?: string;
}

@Injectable({
    providedIn: "root"
})
export class WorkflowService{

    private apiUrl = environment.apiUrl + "/workflow"

      constructor(private http: HttpClient) {}

getWorkflowsCreatedByUser(): Observable<CustomJSONResponse<WorkflowDTO[]>> {
    return this.http.get<CustomJSONResponse<WorkflowDTO[]>>(this.apiUrl + "/createdByMe")
}


getWorkflowById(workflowId: string): Observable<CustomJSONResponse<WorkflowDTO>> {
    return this.http.get<CustomJSONResponse<WorkflowDTO>>(this.apiUrl + "/" + workflowId)

}

updateWorkflowStepStatus(
        workflowId: number,
        workflowStepId: number,
        request: UpdateWorkflowStepRequest
    ): Observable<CustomJSONResponse<string>> {
        return this.http.patch<CustomJSONResponse<string>>(
            `${this.apiUrl}/${workflowId}/step/${workflowStepId}/update`,
            request
        );
    }
}