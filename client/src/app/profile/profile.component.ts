import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @Input() id!: string;
  // private userService = inject(UserService);
  private router = inject(Router);

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
