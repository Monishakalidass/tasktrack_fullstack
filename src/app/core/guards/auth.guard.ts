import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.currentUserValue;
  if (currentUser && currentUser.role) {
    const allowedRoles = route.data['roles'] as Array<string>;

    if (!allowedRoles) return true;

    const userRole = currentUser.role.toUpperCase();
    const isAuthorized = allowedRoles.some(role => role.toUpperCase() === userRole);

    if (isAuthorized) {
      return true;
    }

  
    console.warn(`Access Denied. User Role: ${userRole}, Required: ${allowedRoles}`);
    router.navigate(['/login']);
    return false;
  }


  router.navigate(['/login']);
  return false;
};