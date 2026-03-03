import { ChangeDetectorRef, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkflowStepStatus, Priority, TaskStatus } from '../../models/workflow.model';
import { AdminService } from '../../../core/services/admin.service';
import { UserResponseDto } from '../../models/user.model';
import { NewTaskData } from '../../models/newTask.model';
// Matches the wireframe's intent for a new task


@Component({
  selector: 'app-new-task-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-[100] bg-zinc-950/60 backdrop-blur-sm transition-opacity" (click)="onCancel()"></div>
      
      <div class="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div class="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 dark:border-zinc-800 pointer-events-auto transform transition-all animate-in fade-in zoom-in-95 duration-200">
          
          <div class="px-6 py-5 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
            <div>
              <h2 class="text-lg font-bold text-slate-800 dark:text-zinc-100 uppercase tracking-tight">Create New Task</h2>
              <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Add to Step ID: {{ workflowStepId }}</p>
            </div>
            <button (click)="onCancel()" class="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200">
               <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="p-6 space-y-5">
            
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Task Name</label>
              <input type="text" [(ngModel)]="taskData.title" 
                     placeholder="Enter task title..."
                     class="w-full px-3 py-2 text-sm border border-slate-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
            </div>

            <!-- <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Assigned To</label>
              <select [(ngModel)]="taskData.assignedToUserId"
                      class="w-full px-3 py-2 text-sm border border-slate-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                <option [ngValue]="null">Select Member</option>
                @for (user of users; track user.id) {
                  <option [value]="user.id">{{ user.userName }}</option>
                }
              </select>
            </div>
             -->
<div class="space-y-1.5">
  @if (isLoading()) {
    <div class="h-3 w-20 bg-slate-200 dark:bg-zinc-800 rounded animate-pulse mb-2"></div>
    
    <div class="w-full h-[38px] bg-slate-100 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-md animate-pulse"></div>
  } 
  @else {
    <label class="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Assigned To</label>
    <select [(ngModel)]="taskData.assignedToUserId"
            class="w-full px-3 py-2 text-sm border border-slate-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
      <option [ngValue]="null">Select Member</option>
      @for (user of allUsers; track user.userId) {
        <option [value]="user.userId">{{ user.userName }} - {{user.email}}</option>
      }
    </select>
  }
</div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Status</label>
                <select [(ngModel)]="taskData.status"
                        class="w-full px-3 py-2 text-sm border border-slate-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                   <option value="OPEN">Open</option>
                   <option value="IN_PROGRESS">In Progress</option>
                   <option value="COMPLETED">Completed</option>
                   <option value="BLOCKED">Blocked</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Priority</label>
                <select [(ngModel)]="taskData.priority"
                        class="w-full px-3 py-2 text-sm border border-slate-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                   <option value="LOW">Low</option>
                   <option value="MEDIUM">Medium</option>
                   <option value="HIGH">High</option>
                </select>
              </div>
            </div>
<div class="space-y-1.5">
  <label class="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Due Date</label>
  <input 
    type="date" 
    [(ngModel)]="taskData.dueDate" 
    [min]="minDate"
    class="w-full px-3 py-2 text-sm border border-slate-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all [color-scheme:light] dark:[color-scheme:dark]"
  />
</div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Description</label>
              <textarea [(ngModel)]="taskData.description" rows="3"
                        placeholder="Provide details for this task..."
                        class="w-full px-3 py-2 text-sm border border-slate-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"></textarea>
            </div>

            
          </div>

          <div class="bg-slate-50/50 dark:bg-zinc-800/30 border-t border-slate-100 dark:border-zinc-800 px-6 py-4 flex gap-3 justify-end">
            <button (click)="onCancel()" [disabled]="isLoading()"
                    class="px-4 py-2 text-sm font-bold text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors">
              Cancel
            </button>
            <button (click)="onConfirm()" [disabled]="isLoading()"
                    class="px-6 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2">
              @if (isLoading()) {
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Creating...
              } @else {
                Create Task
              }
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes zoomIn { from { opacity: 0; transform: scale(0.98) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
    .animate-in { animation: zoomIn 0.2s cubic-bezier(0, 0, 0.2, 1); }
  `]
})
export class TaskDialogComponent {
  @Input() isOpen = signal(false);
  @Input() isLoading = signal(false);
  @Input() workflowStepId!: number;

  @Output() confirm = new EventEmitter<NewTaskData>();
  @Output() cancel = new EventEmitter<void>();

  // Default initial state

  taskData: NewTaskData = this.resetForm();
    @Input() allUsers!: UserResponseDto[];



minDate = new Date().toISOString().split('T')[0];
  private resetForm(): NewTaskData {
    return {
      title: '',
      assignedToUserId: null,
      status: 'OPEN' as TaskStatus,
      priority: 'MEDIUM' as Priority,
      description: '',
      workflowStepId: this.workflowStepId,
      dueDate: ''
    };
  }

  onConfirm(): void {
    if(this.taskData.assignedToUserId != null && this.taskData.title !== '' && this.taskData.description !== '' && this.taskData.dueDate != '' && this.taskData.workflowStepId !== null) {

      this.confirm.emit({ ...this.taskData, workflowStepId: this.workflowStepId });
      console.log(this.taskData)
      this.taskData = this.resetForm();
    } else {
      // TODO sonnar error handling
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.taskData = this.resetForm();
    this.isOpen.set(false);
  }
}



