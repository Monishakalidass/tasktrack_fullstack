import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HeaderComponent } from '../../../../../../../shared/components/header/header';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { WorkflowTemplateService } from '../../../../../../../core/services/workflowTemplate.service';
import { WorkflowDTO } from '../../../../../../../shared/models/workflow.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { WorkflowTemplate } from '../../../../../../../shared/models/workflowTemplate.model';
import { Header } from 'primeng/api';
@Component({
  selector: 'app-create-new-workflow',
  imports: [HeaderComponent],
  templateUrl: './create-new-workflow.html',
  styleUrl: './create-new-workflow.css',
})
export class CreateNewWorkflow {
  workflowTemplates: WorkflowTemplate[] = [];
  isLoading = true;
    private destroy$ = new Subject<void>();
constructor(private workflowTemplateService: WorkflowTemplateService,    private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.getAllWorkFlowTemplates();
  }

  getAllWorkFlowTemplates(): void {
    this.isLoading = true;
    this.workflowTemplateService.getWorkflowTemplates()
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log('Full response:', res);
          this.workflowTemplates = Array.isArray(res) ? res : res.data || [];
          console.log('Workflows after assignment:', this.workflowTemplates);
          this.isLoading = false;
           this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching workflows:', err);
          this.isLoading = false;
        },
        complete: () => {
          console.log('Observable completed');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
