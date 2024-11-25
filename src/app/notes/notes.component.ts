import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NoteService } from '../services/note.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule], // Include CommonModule
  templateUrl: './notes.component.html',
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

    // Delete a specific note
    deleteNote(noteId: number): void {
      if (!confirm('Are you sure you want to delete this note?')) {
        return; // Cancel deletion if user clicks "Cancel"
      }
  
      this.userService.deleteNote(noteId).subscribe(
        () => {
          // Remove the deleted note from the notes array
          this.notes = this.notes.filter(note => note.id !== noteId);
          alert('Note deleted successfully');
        },
        (error) => {
          console.error('Failed to delete note', error);
        }
      );
    }
}
