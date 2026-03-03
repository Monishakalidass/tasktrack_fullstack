import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomJSONResponse } from '../../shared/models/user.model';
import { WorkflowDTO, WorkflowStepStatus } from '../../shared/models/workflow.model';
import { environment } from '../../environments/environment';
import { NewTaskData } from '../../shared/models/newTask.model';
import { TaskData } from '../../shared/models/task.model';

@Injectable({
    providedIn: "root"
})
export class TaskService {
      private apiUrl = environment.apiUrl + "/task"

       constructor(private http: HttpClient) {}

       createNewTask(newTask: NewTaskData):Observable<CustomJSONResponse<TaskData>> {
        newTask.assignedToUserId = parseInt(newTask.assignedToUserId as any) ;
        newTask.dueDate = new Date(newTask.dueDate).toISOString()
        return this.http.post<CustomJSONResponse<TaskData>>(this.apiUrl + "/create" , newTask)
       }
}