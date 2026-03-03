import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomJSONResponse } from '../../shared/models/user.model';
import { NewWorkflowDTO, WorkflowDTO, WorkflowStepStatus } from '../../shared/models/workflow.model';
import { environment } from '../../environments/environment';

import { UpdateWorkflowStepRequest } from '../../shared/models/workflow.model';

@Injectable({
    providedIn: "root"
})
export class WorkflowService{

    private apiUrl = environment.apiUrl + "/workflow"

      constructor(private http: HttpClient) {}

getWorkflowsCreatedByUser(): Observable<CustomJSONResponse<WorkflowDTO[]>> {
    return this.http.get<CustomJSONResponse<WorkflowDTO[]>>(this.apiUrl + "/createdByMe")
}

createNewWorkflow(newWorkflowData: NewWorkflowDTO): Observable<CustomJSONResponse<WorkflowDTO>> {
    return this.http.post<CustomJSONResponse<WorkflowDTO>>(this.apiUrl , newWorkflowData)
}

getWorkflowById(workflowId: any): Observable<CustomJSONResponse<WorkflowDTO>> {
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