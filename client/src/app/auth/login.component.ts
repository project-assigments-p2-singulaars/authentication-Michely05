import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { User } from '../shared/models/user';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private loginService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);
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
      await this.loginService.login(user);
      const { id } = this.localStorageService.getItem('user') as User;
      console.log(id);

      this.router.navigate([`/profile/${id}`]);
    } catch (error) {
      alert('Ops! something went wrong');
    }
  }
}
