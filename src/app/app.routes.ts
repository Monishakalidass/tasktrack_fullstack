import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Role } from './shared/enums/role.enum';

export const routes: Routes = [

  { 
    path: 'login', 
    loadComponent: () => import('./pages/auth/login/login').then(m => m.LoginComponent) 
  },
  { 
    path: 'signup', 
    loadComponent: () => import('./pages/auth/signup/signup').then(m => m.SignupComponent) 
  },

  //ADMIN SECTION 
  { 
    path: 'admin', 
    canActivate: [authGuard], 
    data: { roles: [Role.ADMIN] },
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./pages/dashboard/admin/admin-dashboard').then(m => m.AdminDashboardComponent) 
      },
      { 
        path: 'approve', 
        loadComponent: () => import('./pages/dashboard/admin/approve-users/approve-users').then(m => m.ApproveUsersComponent) 
      },
      { 
        path: 'users', 
        loadComponent: () => import('./pages/dashboard/admin/manage-users/manage-users').then(m => m.ManageUsersComponent) 
      }
    ]
  },

  
//   {
//     path: 'manager',
//     canActivate: [authGuard],
//     data: { roles: [Role.MANAGER, Role.ADMIN] },
//     children: [
//       { 
//         path: 'tasks', 
//         // Ensure this path matches your actual folder/file name exactly
//         loadComponent: () => import('./pages/dashboard/manager/task-management').then(m => m.TaskManagementComponent) 
//       }
//     ]
//   },

  //  CATCH-ALLS
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' } 
];