import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { RouterService } from 'src/shared/services/router.service';
import { ToastService } from 'src/shared/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private toaster: ToastService,
    private authService: AuthService,
    public router: RouterService
  ) {}

  ngOnInit(): void {
    // Force logout when registering
    localStorage.removeItem('JWT');
  }

  registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
      rePassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
    },
    { validator: this.passwordMatchValidator }
  );

  /**
   * @description On submit initiate Register functionality
   */
  handleSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;

      // Register user
      this.authService
        .register(
          String(this.registerForm.get('email')!.value),
          String(this.registerForm.get('password')!.value)
        )
        .subscribe({
          // Successful Registration, redirect to Login
          next: (val) => {
            this.isLoading = false;
            this.toaster.makeToast('Registration Successful');
            this.router.redirectToUrl('login');
          },
          // Handle error, *TODO: Show error msg gracefully in UI*
          error: (err) => {
            console.log('err: ', err);
            this.isLoading = false;
            this.toaster.makeToast(err.error);
          },
        });
    } else {
      console.log('form is not valid');
    }
  }

  /**
   * @description Utility function to reset form
   */
  handleReset(): void {
    this.registerForm.reset();
    this.toaster.makeToast('Form resetted');
  }

  /**
   * @description Custom validator to match password and rePassword
   * @param formGroup The form on which to apply validation
   */
  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')!.value;
    const rePassword = formGroup.get('rePassword')!.value;
    if (password !== rePassword) {
      formGroup.get('rePassword')!.setErrors({ passwordMatch: true });
    } else {
      formGroup.get('rePassword')!.setErrors(null);
    }
  }
}
