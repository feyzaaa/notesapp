import { Component, OnInit } from '@angular/core';
import { NoteService, Note } from '../services/note.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe(
      (data) => (this.notes = data),
      (error) => console.error('Error fetching notes:', error)
    );
  }

}
