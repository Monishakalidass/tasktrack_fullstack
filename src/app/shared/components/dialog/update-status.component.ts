import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
  @if (isOpen()) {
  <div class="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md transition-opacity" (click)="onCancel()"></div>
  
  <div class="fixed inset-0 z-[151] flex items-center justify-center p-4 pointer-events-none">
    <div class="bg-zinc-900 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-sm w-full border border-zinc-800 pointer-events-auto transform transition-all animate-in overflow-hidden relative">
      
      <div class="absolute -top-12 -left-12 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] pointer-events-none"></div>

      <div class="p-10 text-center relative z-10">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-3xl bg-red-500/10 mb-6 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
          <svg class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h3 class="text-xl font-black text-white uppercase tracking-tight">{{ title }}</h3>
        <p class="mt-4 text-[13px] font-medium text-zinc-500 leading-relaxed px-2">
          {{ message }}
        </p>
      </div>

      <div class="bg-zinc-950/40 border-t border-zinc-800/60 px-8 py-8 flex flex-col gap-3 justify-center relative z-10">
        
        <button (click)="onConfirm()" 
                [disabled]="isLoading()"
                class="w-full px-6 py-4 text-[11px] font-black text-white bg-red-600 hover:bg-red-500 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-[0.2em] disabled:opacity-50">
          @if (isLoading()) {
            <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          } @else {
            {{ confirmText }}
          }
        </button>

        <button (click)="onCancel()" 
                [disabled]="isLoading()"
                class="w-full px-6 py-3 text-[11px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.2em] transition-colors">
          Discard Action
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