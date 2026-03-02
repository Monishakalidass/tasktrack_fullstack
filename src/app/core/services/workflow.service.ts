import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomJSONResponse } from '../../shared/models/user.model';
import { WorkflowDTO } from '../../shared/models/workflow.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class WorkflowService{

    private apiUrl = environment.apiUrl + "/workflow"

      constructor(private http: HttpClient) {}

getWorkflowsCreatedByUser(): Observable<CustomJSONResponse<WorkflowDTO[]>> {
    return this.http.get<CustomJSONResponse<WorkflowDTO[]>>(this.apiUrl + "/createdByMe")
}
}