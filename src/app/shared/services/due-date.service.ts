import { Injectable } from '@angular/core';

export interface DueDateInfo {
  label: string;
  class: string;
  daysRemaining: number;
  isOverdue: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DueDateService {

  calculateDueDate(dueDate: string | Date): DueDateInfo {
    if (!dueDate) {
      return {
        label: 'No due date',
        class: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600',
        daysRemaining: 0,
        isOverdue: false
      };
    }

    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffTime = due.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
      return {
        label: `Overdue by ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? 's' : ''}`,
        class: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700',
        daysRemaining,
        isOverdue: true
      };
    }

    if (daysRemaining === 0) {
      return {
        label: 'Due today',
        class: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700',
        daysRemaining,
        isOverdue: false
      };
    }

    if (daysRemaining === 1) {
      return {
        label: 'Due tomorrow',
        class: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
        daysRemaining,
        isOverdue: false
      };
    }

    if (daysRemaining <= 7) {
      return {
        label: `In ${daysRemaining} days`,
        class: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700',
        daysRemaining,
        isOverdue: false
      };
    }

    return {
      label: `In ${daysRemaining} days`,
      class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700',
      daysRemaining,
      isOverdue: false
    };
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
