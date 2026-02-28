import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="goBack()" class="flex items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-all group mb-6">
      <div class="p-2 rounded-full border border-zinc-800 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/5 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>
      <span class="text-[10px] font-black uppercase tracking-widest">{{ label }}</span>
    </button>
  `
})
export class BackButtonComponent {
  @Input() label: string = 'Back';
  constructor(private location: Location) {}
  goBack(): void { this.location.back(); }
}