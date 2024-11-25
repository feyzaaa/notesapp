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
  private userId: number | undefined;
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

  // Fetch notes for a specific user by user ID
  getUserNotes(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notes/${userId}`);
    this.userId = userId;
  }

  // Delete a specific note
  deleteNote(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${noteId}`);
  }


}
