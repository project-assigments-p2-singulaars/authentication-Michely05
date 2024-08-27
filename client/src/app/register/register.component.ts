import { Component, inject } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  formgroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submitUser() {
    if (this.formgroup.valid) {
      this.authService.register(this.formgroup.value).subscribe((response) => {
        if (response.accessToken) {
          localStorage.setItem('token', response.accessToken);
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
