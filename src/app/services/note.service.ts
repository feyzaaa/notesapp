import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note {
  id?: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://localhost:3000/api/notes'; // Backend API

  constructor(private http: HttpClient) {}

  // Fetch all notes
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  // Create a new note
  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  // Update a note
  updateNote(id: number, note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note);
  }

  // Delete a note
  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
