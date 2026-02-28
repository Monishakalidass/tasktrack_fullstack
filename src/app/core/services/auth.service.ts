import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; 
import { CustomJSONResponse, UserResponseDto } from '../../shared/models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  signup(userData: any): Observable<CustomJSONResponse<UserResponseDto>> {
    return this.http.post<CustomJSONResponse<UserResponseDto>>(`${this.apiUrl}/signup`, userData);
  }

  login(credentials: any): Observable<CustomJSONResponse<string>> {
    return this.http.post<CustomJSONResponse<string>>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.data) {
          const token = response.data;
          localStorage.setItem('auth_token', token);
          
         
          const decoded: any = jwtDecode(token);
          const userDetails = {
            role: decoded.role,
            email: decoded.sub, // Usually 'sub' holds the email/username in JWT
          };
          localStorage.setItem('user', JSON.stringify(userDetails));
        }
      })
    );
  }

  getRoleFromToken(): string {
    const token = localStorage.getItem('auth_token');
    if (!token) return 'NONE';
    try {
      const decoded: any = jwtDecode(token);
      return decoded.role || 'NONE'; 
    } catch {
      return 'NONE';
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  // This is what the authGuard uses to check permissions
  get currentUserValue() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}