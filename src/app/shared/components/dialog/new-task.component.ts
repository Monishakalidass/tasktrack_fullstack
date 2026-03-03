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
  <div class="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md transition-opacity" (click)="onCancel()"></div>
  
  <div class="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
    <div class="bg-zinc-900 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.6)] max-w-4xl w-full h-auto md:h-fit max-h-[90vh] border border-zinc-800 pointer-events-auto transform transition-all animate-in flex flex-col overflow-hidden relative">
      
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div class="px-6 md:px-10 py-6 border-b border-zinc-800/60 flex justify-between items-center relative z-10 shrink-0">
        <div>
          <h2 class="text-lg md:text-xl font-black text-white uppercase tracking-tight">Create a new task</h2>
          <p class="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-1">
            Under workflow step <span class="text-indigo-400">{{workflowStepName}}</span>
          </p>
        </div>
        <button (click)="onCancel()" class="p-2 rounded-xl bg-zinc-800/50 text-zinc-400 hover:text-white transition-all">
           <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 md:p-10 relative z-10 md:max-h-[60vh]
                  scrollbar-thin scrollbar-thumb-indigo-600/20 scrollbar-track-transparent">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 items-start">
          
          <div class="space-y-6">
            <div class="space-y-2.5">
              <label class="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Task Title</label>
              <input type="text" [(ngModel)]="taskData.title" 
                     placeholder="What's the task called?"
                     class="w-full px-5 py-4 text-sm border border-zinc-800 rounded-2xl bg-zinc-950 text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-zinc-700">
            </div>

            <div class="space-y-2.5">
              <label class="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Scope of Work</label>
              <textarea [(ngModel)]="taskData.description" rows="6"
                        placeholder="Provide clear instructions..."
                        class="w-full px-5 py-4 text-sm border border-zinc-800 rounded-2xl bg-zinc-950 text-zinc-300 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none placeholder:text-zinc-700"></textarea>
            </div>
          </div>

          <div class="space-y-6">
            <div class="space-y-2.5">
              <label class="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Assignee</label>
              <div class="relative group">
                <select [(ngModel)]="taskData.assignedToUserId"
                        class="w-full px-5 py-4 text-sm border border-zinc-800 rounded-2xl bg-zinc-950 text-white appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500/20">
                  <option [ngValue]="null">Select Member</option>
                  @for (user of allUsers; track user.userId) {
                    <option [value]="user.userId">{{ user.userName }}</option>
                  }
                </select>
                <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2.5">
                <label class="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Priority</label>
                <select [(ngModel)]="taskData.priority"
                        class="w-full px-4 py-4 text-[10px] font-black border border-zinc-800 rounded-2xl bg-zinc-950 uppercase outline-none focus:ring-2 focus:ring-indigo-500/20"
                        [ngClass]="{'text-red-500': taskData.priority === 'HIGH', 'text-amber-500': taskData.priority === 'MEDIUM', 'text-zinc-400': taskData.priority === 'LOW'}">
                   <option value="LOW">Low</option>
                   <option value="MEDIUM">Med</option>
                   <option value="HIGH">High</option>
                </select>
              </div>
              <div class="space-y-2.5">
                <label class="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Initial Status</label>
                <select [(ngModel)]="taskData.status"
                        class="w-full px-4 py-4 text-[10px] font-black border border-zinc-800 rounded-2xl bg-zinc-950 text-indigo-400 uppercase outline-none">
                   <option value="OPEN">Open</option>
                   <option value="IN_PROGRESS">Active</option>
                </select>
              </div>
            </div>

            <div class="space-y-2.5">
              <label class="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Target Deadline</label>
              <input type="date" [(ngModel)]="taskData.dueDate" [min]="minDate"
                     class="w-full px-5 py-4 text-sm border border-zinc-800 rounded-2xl bg-zinc-950 text-white [color-scheme:dark] outline-none focus:ring-2 focus:ring-indigo-500/20">
            </div>
          </div>
        </div>
      </div>

      <div class="bg-zinc-950/40 px-6 md:px-10 py-6 flex flex-col-reverse md:flex-row gap-3 md:gap-4 justify-end border-t border-zinc-800/60 shrink-0 relative z-10">
        <button (click)="onCancel()" class="px-6 py-3 text-[11px] font-black text-zinc-600 hover:text-white uppercase tracking-widest transition-colors">Discard</button>
        <button (click)="onConfirm()" [disabled]="isLoading()"
                class="px-10 py-4 text-[11px] font-black text-white bg-indigo-600 hover:bg-indigo-500 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest w-full md:w-auto">
          @if (isLoading()) {
            <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          } @else {
            Deploy Task
          }
        </button>
      </div>
    </div>
  </div>
}`,
  styles: [`
    @keyframes zoomIn { from { opacity: 0; transform: scale(0.98) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
    .animate-in { animation: zoomIn 0.2s cubic-bezier(0, 0, 0.2, 1); }
  `]
})
export class TaskDialogComponent {
  @Input() isOpen = signal(false);
  @Input() isLoading = signal(false);
  @Input() workflowStepId!: number;
  @Input() workflowStepName!: string;
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



