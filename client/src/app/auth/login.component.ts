import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private loginService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  route = inject(Router);
  localStorageService = inject();
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async submit() {
    const user: User = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };
    try {
      if (this.loginForm.valid) {
        // this.loginService.login(user).subscribe((r) => {
        //   // localStorage.setItem('token', r.accessToken)
        //   this.route.navigate(['/home']);
        // });
        const result = await this.loginService.login(user);
        this.route.navigate(['']);
      }
    } catch (error) {
      alert('Ops! Something went wrong');
    }
  }
}
