import { Component } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private userService: UserService, private router: Router) {}

  // Register a user
  register(displayname: string, username: string, pw: string): void {
    const newUser: User = { displayname, username, pw };
    this.userService.register(newUser).subscribe(
      (response) => {
        alert('Registration successful!');
        console.log('Registered user:', response);
      },
      (error) => {
        alert('Registration failed!');
        console.error('Error:', error);
      }
    );
  }

  // Login a user
  login(username: string, pw: string): void {
    this.userService.login({ username, pw }).subscribe(
      (response) => {
        alert(`Login successful! Welcome, ${response.user.displayname}`);
        console.log('User logged in:', response.user);
        const userId = response.user.id;
        // Navigate to the personal notes page
        this.router.navigate(['/notes'], { state: { userId } });
      },
      (error) => {
        alert('Login failed!');
        console.error('Error:', error);
      }
    );
  }
}
