import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule], // Include CommonModule
  template: `
    <h1>Your Notes</h1>
<div *ngIf="notes?.length === 0">No notes found. Create one!</div>
<ul>
  <li *ngFor="let note of notes">
    <h3>{{ note.title }}</h3>
    <p>{{ note.content }}</p>
  </li>
</ul>

  `,
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  userId: number = 1; // Beispiel-Benutzer-ID, später dynamisch setzen

  constructor(private userService: UserService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.userId = navigation?.extras.state?.['userId'];
    console.log('Received userId:', this.userId);
  }


  ngOnInit(): void {
    this.loadUserNotes();
  }

  // Fetch the notes for the current user by user ID
  loadUserNotes(): void {
    this.userService.getUserNotes(this.userId).subscribe(
      (data) => {
        console.log('Fetched notes:', data);
        this.notes = data;
      },
      (error) => {
        console.error('Failed to fetch notes', error.message, error.status, error.error);
    
      }
    );
  }
}
