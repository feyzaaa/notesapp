import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'notes', component: NotesComponent }, // Personal Notes route
  { path: '**', redirectTo: '' }, // Catch-all route
];
