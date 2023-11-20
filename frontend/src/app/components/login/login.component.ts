import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterService } from 'src/shared/services/router.service';
import { ToastService } from 'src/shared/services/toast.service';
import { AuthService } from 'src/shared/services/auth.service';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toaster: ToastService,
    public router: RouterService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Redirect to Dashboard if user already logged in
    if (this.authService.token) this.router.redirectToUrl('dashboard');
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  /**
   * @description On submit initiate login functionality
   */
  handleSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // Login
      this.authService
        .login(
          String(this.loginForm.get('email')!.value),
          String(this.loginForm.get('password')!.value)
        )
        .subscribe({
          // Successful login, redirect to dashboard
          next: () => {
            console.log('Login successful');
            this.isLoading = false;
            this.toaster.makeToast('Login successful');
            this.router.redirectToUrl('dashboard');
          },
          // Handle Error
          error: (err) => {
            console.log('error: ', err);
            this.isLoading = false;
            this.toaster.makeToast(err.error);
            this.loginForm.reset();
          },
        });
    } else {
      console.log('form is not valid');
    }
  }
}
