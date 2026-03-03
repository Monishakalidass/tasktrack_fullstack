import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity z-100" (click)="onCancel()"></div>
      
      <div class="fixed inset-0 z-200 flex items-center justify-center p-4 pointer-events-none">
        <div class="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-sm w-full border border-slate-200 dark:border-zinc-800 pointer-events-auto transform transition-all animate-in overflow-hidden">
          
          <div class="p-8 text-center">
            <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-50 dark:bg-red-500/10 mb-5 border border-red-100 dark:border-red-500/20">
              <svg class="h-7 w-7 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 class="text-lg font-bold text-slate-800 dark:text-zinc-100 uppercase tracking-tight">{{ title }}</h3>
            <p class="mt-3 text-sm text-slate-500 dark:text-zinc-400 leading-relaxed px-2">
              {{ message }}
            </p>
          </div>

          <div class="bg-slate-50/50 dark:bg-zinc-800/30 border-t border-slate-100 dark:border-zinc-800 px-6 py-5 flex gap-3 justify-center">
            <button (click)="onCancel()" 
                    [disabled]="isLoading()"
                    class="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors">
              Cancel
            </button>
            
            <button (click)="onConfirm()" 
                    [disabled]="isLoading()"
                    class="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-md shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              @if (isLoading()) {
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              } @else {
                {{ confirmText }}
              }
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes zoomIn { 
      from { opacity: 0; transform: scale(0.98) translateY(10px); } 
      to { opacity: 1; transform: scale(1) translateY(0); } 
    }
    .animate-in { animation: zoomIn 0.2s cubic-bezier(0, 0, 0.2, 1); }
  `]
})
export class ConfirmDialogComponent {
  @Input() isOpen = signal(false);
  @Input() isLoading = signal(false);
  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() confirmText: string = 'Confirm';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
    this.isOpen.set(false);
  }
}