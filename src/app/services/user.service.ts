import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  displayname: string;
  username: string;
  pw: string;
  role?: 'USER' | 'ADMIN';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Backend API for users

  constructor(private http: HttpClient) {}

  // Register a new user
  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Login (returns token or user details)
  login(credentials: { username: string; pw: string }): Observable<{ message: string; role: string; user: User }> {
    return this.http.post<{ message: string; role: string; user: User }>(
      `${this.apiUrl}/login`,
      credentials
    );
  }
  
}
