import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomJSONResponse } from '../../shared/models/user.model';
import { WorkflowDTO } from '../../shared/models/workflow.model';
import { environment } from '../../environments/environment';
import { WorkflowTemplate } from '../../shared/models/workflowTemplate.model';

@Injectable({
    providedIn: "root"
})
export class WorkflowTemplateService{

    private apiUrl = environment.apiUrl + "/workflow/template"

      constructor(private http: HttpClient) {}

getWorkflowTemplates(): Observable<CustomJSONResponse<WorkflowTemplate[]>> {
    return this.http.get<CustomJSONResponse<WorkflowTemplate[]>>(this.apiUrl + "/all")
}
}