import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HeaderComponent } from '../../../../../../../shared/components/header/header';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { WorkflowService } from '../../../../../../../core/services/workflow.service';
import { WorkflowDTO } from '../../../../../../../shared/models/workflow.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { toast } from 'ngx-sonner';
@Component({
  selector: 'app-view-all',
  imports: [HeaderComponent, ButtonModule, RouterLink, TableModule, CommonModule],
  templateUrl: './view-all.html'
})
export class ViewAll implements OnInit, OnDestroy {
  workflows: WorkflowDTO[] = [];
  isLoading: boolean = true;
  private destroy$ = new Subject<void>();

  constructor(private workflowService: WorkflowService,    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllWorkFlows();
  }

  getAllWorkFlows(): void {
    this.isLoading = true;
    this.workflowService.getWorkflowsCreatedByUser()
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log('Full response:', res);
          this.workflows = Array.isArray(res) ? res : res.data || [];
          console.log('Workflows after assignment:', this.workflows);
          this.isLoading = false;
           this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching workflows:', err);
           toast.error("Error fetching workflows", {description: "We encoutered an error while fething all workflows, please try again later"})
                    
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

