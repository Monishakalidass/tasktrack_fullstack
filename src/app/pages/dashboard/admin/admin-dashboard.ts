import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  // HeaderComponent must be here to use <app-header> in the HTML
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboardComponent implements OnInit {
  adminName: string = 'Admin';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // You can later pull the specific admin name from your AuthService
    console.log('Admin Dashboard Initialized');
  }
}